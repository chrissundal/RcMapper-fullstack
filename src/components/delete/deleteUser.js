import axios from 'axios';

const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`https://localhost:3000/api/users/${id}`);
        return response.status === 200;
    } catch (err) {
        console.log('Feil ved sletting:', err);
        return false;
    }
};

export default deleteUser;
