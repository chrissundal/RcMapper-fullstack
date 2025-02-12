import axios from 'axios';

const postLocation = async (newLocation) => {
    try {
        await axios.post('https://localhost:3000/api/locations', newLocation);
    } catch (error) {
        console.error(error.response?.data || error.message);
    }
};

export default postLocation;
