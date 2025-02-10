import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MapIcons from '../MapIcons.js';
import axios from "axios";

const fetchLocations = (map) => {
    axios.get('https://localhost:3000/api/locations').then(res => {
    const locations = res.data
    locations.forEach(location => {
      const icon = MapIcons[location.category] || MapIcons['Default'];

      L.marker([location.latitude, location.longitude], { icon })
        .addTo(map)
        .bindPopup(`
    <div class="locationPopup">
        <strong>${location.title}</strong>
        <button onclick="navigateToDetails(${location.locationId})">Details</button>
    </div>
`);
    });
    })
    .catch(error => {
        console.error('Error fetching locations:', error);
    })
};

export default fetchLocations;
