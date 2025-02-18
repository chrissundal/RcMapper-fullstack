import axios from 'axios';

const putUser = async (updatedUser) => {
    try {
        await axios.put('https://localhost:3000/api/users', updatedUser);
        return true;
    } catch (error) {
        console.error(error.response?.data || error.message);
        return false;
    }
};

export default putUser;
