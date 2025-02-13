import axios from 'axios';

const fetchFavorites = async (id) => {
    try {
        const response = await axios.get(`https://localhost:3000/api/favorites/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export default fetchFavorites;

