<template>
  <div id="map" ref="mapContainer"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MapIcons from './MapIcons.js'

const mapContainer = ref(null);

const initializeMap = (latitude, longitude) => {
  const map = L.map(mapContainer.value).setView([latitude, longitude], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map);

  L.circleMarker([latitude, longitude], {
    radius: 8,
    color: 'blue',
    fillColor: '#30c0ff',
    fillOpacity: 0.6
  }).addTo(map)
      .bindPopup('You are here!')
      .openPopup();

  fetchLocations(map);
};

const fetchLocations = async (map) => {
  try {
    const response = await fetch('https://localhost:3000/api/locations');
    const locations = await response.json();
    console.log('Fetched locations:', locations);

    locations.forEach(location => {
        const date = new Date(location.createdAt);
        const icon = MapIcons[location.category] || MapIcons['Default'];

        L.marker([location.latitude, location.longitude], { icon })
            .addTo(map)
            .bindPopup(`
          <strong>${location.title}</strong>
          <br><p>${location.description}</p>
          <p>Opprettet av: ${location.userId}</p>
          <p>${date.toLocaleString()}</p>
        `);
    });
  } catch (error) {
    console.error('Error fetching locations:', error);
  }
};

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          initializeMap(latitude, longitude);
        },
        error => {
          console.error('Error getting geolocation:', error);
          initializeMap(59.0586, 10.0444);
        }
    );
  } else {
    initializeMap(59.0586, 10.0444);
  }
});
</script>

<style scoped>
#map {
  height: 500px;
  width: 100%;
  border-radius: 10px;
}
</style>
