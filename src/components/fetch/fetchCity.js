import axios from 'axios';

const getCityName = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`;
    try {
        const response = await axios.get(url);
        const address = response.data.address;
        const city = address.city || address.town || address.village || address.hamlet || address.locality || address.municipality;
        return city;
    } catch (error) {
        return 'Unknown';
    }
};

export default getCityName;








