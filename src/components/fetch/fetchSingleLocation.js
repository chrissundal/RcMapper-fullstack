import axios from "axios";

const fetchLocationDetails = (id) => {
    return axios.get(`https://localhost:3000/api/locations/${id}`)
    .then(res => res.data)
    .catch(error => {
        console.error('Feil ved lasting av Location', error);
    });
};

export default fetchLocationDetails;


