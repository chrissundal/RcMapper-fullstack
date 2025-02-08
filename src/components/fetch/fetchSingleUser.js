import axios from "axios";

const fetchSingleUser = (id) => {
    return axios.get(`https://localhost:3000/api/users/${id}`)
        .then(res => {
        console.log(`Fetched user with ID ${id}:`, res.data);
        return res.data
        })
        .catch (error => {
            console.error('Error fetching user:', error);
        })
}
export default fetchSingleUser ;
