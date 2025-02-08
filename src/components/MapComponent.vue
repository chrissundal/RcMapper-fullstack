<template>
  <div id="map" ref="mapContainer"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const mapContainer = ref(null);

onMounted(async () => {
  const map = L.map(mapContainer.value).setView([59.0586, 10.0444], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map);

  try {
    const response = await fetch('http://localhost:3000/api/locations');
    const locations = await response.json();
    console.log('Fetched locations:', locations);

    locations.forEach(location => {
      L.marker([location.latitude, location.longitude])
        .addTo(map)
        .bindPopup(location.title);
    });
  } catch (error) {
    console.error('Error fetching locations:', error);
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
