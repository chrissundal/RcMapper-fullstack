import axios from "axios";

const fetchSingleUser = (id) => {
    return axios.get(`https://localhost:3000/api/users/${id}`)
        .then(res => res.data)
        .catch (error => {
            console.error('Feil ved henting av bruker:', error);
        })
}
export default fetchSingleUser ;
