import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MapIcons from './MapIcons.js';
import axios from "axios";

const fetchLocations = async (map) => {
  try {
    const response = await axios.get('https://localhost:3000/api/locations');
    const locations = await response.data;
    console.log('Fetched locations:', locations);

    locations.forEach(location => {
      const date = new Date(location.createdAt);
      const icon = MapIcons[location.category] || MapIcons['Default'];

      const popupContent = `
        <strong>${location.title}</strong>
        <br><p>${location.description}</p>
        <p>Opprettet av: ${location.userId}</p>
        <p>${date.toLocaleString()}</p>
        <button onclick="navigateToDetails(${location.locationId})">Details</button>
      `;

      L.marker([location.latitude, location.longitude], { icon })
        .addTo(map)
        .bindPopup(popupContent);
    });
  } catch (error) {
    console.error('Error fetching locations:', error);
  }
};

export default fetchLocations;
