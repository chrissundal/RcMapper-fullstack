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

const deleteChatAndImage = async (chatId) => {
    try {
        const chat = await Chat.findOne({ where: { chatId } });
        if (!chat) {
            console.error('Chat not found');
            return false;
        }
        if (chat.fileUrl) {
            const filePath = path.join('uploads', path.basename(chat.fileUrl));
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
            });
        }
        await Chat.destroy({ where: { chatId } });
        return true;
    } catch (error) {
        console.error('Error deleting chat:', error);
        return false;
    }
};

const getChats = async (req, res) => {
    const { category } = req.query;
    try {
        let chats;
        let sortedChats;
        if (category) {
            chats = await Chat.findAll({where: {category}});
            sortedChats = chats.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        if (chats.length > 50) {
            const oldestChats = sortedChats.slice(-10);
            for (let chat of oldestChats) {
                await deleteChatAndImage(chat.chatId)
            }
            chats = await Chat.findAll({where: {category}});
        }
        res.json(chats);
    } catch (error) {
        console.error('Error fetching chats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const postChat = async (req, res) => {
    try {
        const chat = await Chat.create(req.body);
        res.status(201).json(chat);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const deleteChat = async (req, res) => {
    try {
        const success = await deleteChatAndImage(req.params.id);
        if (!success) {
            return res.status(404).send('Chat not found');
        }
        res.status(200).send('Chat and associated file deleted');
    } catch (error) {
        console.error('Error deleting chat:', error);
        res.status(500).json({ error: 'Internal server error' });
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
};
