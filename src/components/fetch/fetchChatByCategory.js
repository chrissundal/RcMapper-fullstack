import axios from "axios";

const fetchChatByCategory = async (category) => {
    try {
        const response = await axios.get(`https://localhost:3000/api/chats`, {
            params: { category }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching chats:', error);
        return [];
    }
}
export default fetchChatByCategory;

