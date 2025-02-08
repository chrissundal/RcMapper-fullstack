import axios from "axios";

const fetchUsers = async (id) => {
    try {
        const response = await axios.get('https://localhost:3000/api/users');
        console.log('Fetched users:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
    }
}
export default fetchUsers ;
