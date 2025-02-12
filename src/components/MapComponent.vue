<template>
    <div id="map" ref="mapContainer"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import fetchLocations from './fetch/locationsFetch.js';
import extracted from '@/components/NewLocationHtml.js';
import deleteLocation from '@/components/delete/deleteLocation.js';
import { useStore } from 'vuex';
import postLocation from "@/components/post/postLocation.js";

const store = useStore();
const mapContainer = ref(null);
const router = useRouter();
const markersGroup = ref(null);
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
        fillOpacity: 0.6,
    })
        .addTo(map)
        .bindPopup('Du er her')
        .openPopup();

    markersGroup.value = L.layerGroup().addTo(map);
    fetchLocations(map, store.state.user, markersGroup.value);

    map.on('click', onMapClick);
};

const onMapClick = (e) => {
    popup
        .setLatLng(e.latlng)
        .setContent(extracted(e, store.state.user))
        .openOn(map);
};

window.handleDeleteLocation = async (id) => {
    if(confirm('Er du sikker?')) {
        const success = await deleteLocation(id);
        if (success) {
            popup.remove();
            fetchLocations(map, store.state.user, markersGroup.value);
        } else {
            console.error('Kunne ikke slettes');
        }
    }
};
window.handlePostNewLocation = async (newLoc) => {
    await postLocation(newLoc);
    fetchLocations(map, store.state.user, markersGroup.value);
    popup.close();
};

window.navigateToDetails = (id) => {
    router.push(`/details/${id}`);
};

onMounted(() => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                initializeMap(latitude, longitude);
            },
            (error) => {
                console.error('Feil ved henting av geodata:', error);
                initializeMap(59.0586, 10.0444);
            }
        );
    } else {
        initializeMap(59.0586, 10.0444);
    }
});

onUnmounted(() => {
    if (markersGroup.value) {
        markersGroup.value.clearLayers();
        map.removeLayer(markersGroup.value);
    }
    if (map) {
        map.remove();
    }
});
</script>

<style>
#map {
    height: 70vh;
    width: 90vw;
    border-radius: 10px;
    font-family: "Glossy Sheen";
}
.locationPopup {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 5px;
    text-align: center;
}
.new-location {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    gap: 10px;
    font-family: "Glossy Sheen";
}
.new-location button {
    padding: 10px;
    border-radius: 10px;
    border: none;
    transition: 0.4s ease;
    font-size: medium;
    font-family: "Glossy Sheen";
}
.new-location button:hover {
    transform: scale(1.04);
    background: #30c0ff;
}
.new-location input {
    font-family: "Glossy Sheen";
    outline: none;
    border-radius: 10px;
    padding: 10px;
}
.new-location select {
    border-radius: 10px;
    height: 30px;
    cursor: pointer;
}
.delete-location {
    width: 25px;
    height: 25px;
    font-weight: bold;
    position: relative;
    bottom: 10px;
    right: 20px;
    transition: 0.3s ease;
    background: url("/icons/trash.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}
.delete-location:hover {
    cursor: pointer;
    transform: scale(1.03);
    background: url("/icons/trashred.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}
.details-button {
    border-radius: 8px;
    border: none;
    padding: 5px;
    transition: 0.3s ease;
    font-size: medium;
    font-family: "Glossy Sheen";
}
.details-button:hover {
    cursor: pointer;
    transform: scale(1.03);
    background-color: #30c0ff;
    color: white;
}
.locationPopup h3 {
    color: #30c0ff;
    margin-top: 0;
    margin-bottom: 10px;
    font-family: "Glossy Sheen";
    font-size: large;
}
</style>
