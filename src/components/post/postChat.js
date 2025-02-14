import axios from 'axios';

const postChat = async (newChat) => {
    try {
        await axios.post('https://localhost:3000/api/chats', newChat);
    } catch (error) {
        console.error(error.response?.data || error.message);
    }
};

export default postChat;
