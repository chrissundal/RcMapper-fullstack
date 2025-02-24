import axios from 'axios';
import store from '@/store';

const putUser = async (updatedUser) => {
    try {
        const response = await axios.put('https://localhost:3000/api/users', updatedUser, {
            headers: {
                Authorization: `Bearer ${store.state.sessionId}`
            }
        });
        return true;
    } catch (error) {
        console.error(error.response?.data || error.message);
        return false;
    }
};

export default putUser;

