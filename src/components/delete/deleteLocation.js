import axios from 'axios';

const deleteLocation = async (id) => {
    try {
        const response = await axios.delete(`https://localhost:3000/api/locations/${id}`);
        if (response.status === 200) {
            console.log(`Location ${id} deleted successfully`);
            return true;
        } else {
            console.log(`Failed to delete location ${id}: ${response.data.message}`);
            return false;
        }
    } catch (err) {
        console.log('Error deleting location:', err);
        return false;
    }
};

export default deleteLocation;

