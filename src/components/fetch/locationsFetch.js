import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MapIcons from '../MapIcons.js';
import axios from 'axios';

const fetchLocations = async (map, user, markersGroup, filters = {}) => {
    if (markersGroup) {
        markersGroup.clearLayers();
    } else {
        markersGroup = L.layerGroup().addTo(map);
    }

    const queryParams = new URLSearchParams(filters).toString();

    try {
        const res = await axios.get(`https://localhost:3000/api/locations?${queryParams}`);
        const locations = res.data;

        locations.forEach(location => {
            const icon = MapIcons[location.category] || MapIcons['Default'];
            let checkDelete = location.userId === user.id || user.admin
                ? `<div class="delete-location" onclick="handleDeleteLocation(${location.locationId})"></div>`
                : '';

            const marker = L.marker([location.latitude, location.longitude], { icon })
                .bindPopup(`
                <div class="locationPopup">
                  ${checkDelete}
                  <h3>${location.title}</h3>
                  <button class="details-button" onclick="navigateToDetails(${location.locationId},'${location.title}')">Detaljer</button>
                </div>
            `);
            markersGroup.addLayer(marker);
        });
    } catch (error) {
        console.error('Feil ved henting av locations', error);
    }
};

export default fetchLocations;
