import axios from "axios";

const fetchLocationDetails = async (id) => {
  try {
    const response = await axios.get(`https://localhost:3000/api/locations/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching location details:', error);
    throw error;
  }
};

export default fetchLocationDetails;

