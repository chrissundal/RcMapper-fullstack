import axios from 'axios';

const postLocation = async (newLocation) => {
    try {
        const response = await axios.post('https://localhost:3000/api/locations', newLocation);
        console.log('Location saved successfully:', response.data);
    } catch (error) {
        console.error('Error saving location:', error.response?.data || error.message);
    }
};

export default postLocation;
