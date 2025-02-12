import axios from "axios";

const fetchUsers = () => {
    return axios.get('https://localhost:3000/api/users')
    .then(res => res.data)
    .catch(error => {
        console.error('Feil ved henting av brukere:', error);
    })
}
export default fetchUsers ;
