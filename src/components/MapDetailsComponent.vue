<template>
    <div id="map" ref="mapContainer"></div>
</template>

<script setup>
import {ref, onUpdated} from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const props = defineProps({
    location: {
        type: Object,
        required: true,
    },
});

const mapContainer = ref(null);

const initializeMap = () => {
    const map = L.map(mapContainer.value, {
        center: [props.location.latitude, props.location.longitude],
        zoom: 15,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        clickable: false,
    })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    L.marker([props.location.latitude, props.location.longitude]).addTo(map);
};

onUpdated(() => {
    if (props.location.latitude && props.location.longitude) {
        initializeMap();
    }
})
</script>

<style scoped>
#map {
    height: 40vh;
    width: 100%;
}
</style>
