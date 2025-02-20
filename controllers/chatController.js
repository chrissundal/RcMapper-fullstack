import Chat from "../models/Chat.js";
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
    Chat.destroy({ where: { chatId: req.params.id } })
        .then(() => {
            res.status(200).send('Sted slettet');
        }).catch(err => {
        res.status(500).send('Server error');
    })
}

export default {
    getChats,
    postChat,
    deleteChat,
}


