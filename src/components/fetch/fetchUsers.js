import axios from "axios";

const fetchUsers = () => {
    return axios.get('https://localhost:3000/api/users')
    .then(res => {
        console.log('Fetched users:', res.data);
        return res.data
    })
    .catch(error => {
        console.error('Error fetching users:', error);
    })
}
export default fetchUsers ;
