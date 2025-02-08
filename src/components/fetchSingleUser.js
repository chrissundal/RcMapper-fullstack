import axios from "axios";

const fetchSingleUser = async (id) => {
    try {
        const response = await axios.get(`https://localhost:3000/api/users/${id}`);
        console.log(`Fetched user with ID ${id}:`, response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
    }
}
export default fetchSingleUser ;
