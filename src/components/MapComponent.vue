<template>
  <div id="map" ref="mapContainer">

  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRouter } from 'vue-router';
import fetchLocations from "./fetch/locationsFetch.js";
import extracted from "@/components/NewLocationHtml.js";

const mapContainer = ref(null);
const router = useRouter();
let map;
let popup = L.popup();

const initializeMap = (latitude, longitude) => {
       map = L.map(mapContainer.value).setView([latitude, longitude], 13);

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
      map.on('click', onMapClick);
};

const onMapClick = (e) => {
    popup
        .setLatLng(e.latlng)
        .setContent(extracted(e, map, popup))
        .openOn(map);
};

window.navigateToDetails = (id) => {
    router.push(`/details/${id}`);
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

<style>
#map {
  height: 70vh;
  width: 90vw;
  border-radius: 10px;
}
.locationPopup {
    display: flex;
    flex-direction: column;
}
.locationPopup button {
    border-radius: 8px;
    border: none;
    padding: 5px;
    transition: 0.3s ease;
    font-size: medium;
    font-weight: bold;
}
.locationPopup button:hover {
    cursor: pointer;
    transform: scale(1.03);
    background-color: #30c0ff;
}
.new-location {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    gap: 10px;
}
</style>
