import Chat from "../models/Chat.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        cb(null, `${name}-${Date.now()}${ext}`);
    },
});

const upload = multer({ storage: storage });
const getChats = async (req, res) => {
    const { category } = req.query;
    try {
        let chats;
        let sortedChats;
        if (category) {
            chats = await Chat.findAll({ where: { category } });
            sortedChats = chats.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        if (chats.length > 50) {
            const oldestChats = sortedChats.slice(-10);
            for (let chat of oldestChats) {
                await Chat.destroy({ where: { chatId: chat.chatId } });
            }
            if (category) {
                chats = await Chat.findAll({ where: { category }, order: [['createdAt', 'DESC']] });
            }
        }
        res.json(chats);
    } catch (error) {
        console.error('Error fetching chats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const postChat = async (req, res) => {
    Chat.create(req.body)
        .then(chat => {
            res.status(201).json(chat);
        })
        .catch((err) => {
            res.status(500).send('Server error');
        })
}
const deleteChat = async (req, res) => {
    try {
        const chat = await Chat.findOne({ where: { chatId: req.params.id } });
        if (!chat) {
            return res.status(404).send('Chat not found');
        }
        if (chat.fileUrl) {
            const filePath = path.join('uploads', path.basename(chat.fileUrl));

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
            });
        }

        await Chat.destroy({ where: { chatId: req.params.id } });
        res.status(200).send('Chat and associated file deleted');
    } catch (error) {
        console.error('Error deleting chat:', error);
        res.status(500).send('Server error');
    }
};

const uploadFile = (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
    res.status(200).json({ url: fileUrl });
};
export default {
    getChats,
    postChat,
    deleteChat,
    upload,
    uploadFile,
}
