const fetchLocationDetails = async (id) => {
  try {
    const response = await fetch(`https://localhost:3000/api/locations/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching location details:', error);
    throw error;
  }
};

export default fetchLocationDetails;

