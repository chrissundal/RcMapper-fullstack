<template>
  <div id="map" ref="mapContainer"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRouter } from 'vue-router';
import fetchLocations from "@/components/locationsFetch.js";

const mapContainer = ref(null);
const router = useRouter();

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
const navigateToDetails = (id) => {
    router.push(`/details/${id}`);
};
window.navigateToDetails = navigateToDetails;

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
  height: 70vh;
  width: 90vw;
  border-radius: 10px;
}

</style>
