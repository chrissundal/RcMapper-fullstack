import axios from "axios";

const fetchLocationDetails = (id) => {
    return axios.get(`https://localhost:3000/api/locations/${id}`)
    .then(res => res.data)
    .catch(error => {
        console.error('Error fetching location details:', error);
    });
};

export default fetchLocationDetails;


