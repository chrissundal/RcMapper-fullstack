import axios from 'axios';

const fetchRatings = async (id) => {
    try {
        const response = await axios.get(`https://localhost:3000/api/ratings/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export default fetchRatings;
