import axios from 'axios';

const postRating = async (newRating) => {
    try {
        await axios.post('https://localhost:3000/api/ratings', newRating);
    } catch (error) {
        console.error(error.response?.data || error.message);
    }
};

export default postRating;
