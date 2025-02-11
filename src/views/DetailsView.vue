<template>
    <div class="details-container">
        <div v-if="location" class="details">
            <h1>{{ location.title }}</h1>
            <p>{{ location.description }}</p>
            <img :src="getIconUrl(location.category)" alt="Category Icon" class="category-icon" />
            <p>Kategori: {{ location.category }}</p>
            <MapDetailsComponent :location="location" />
            <p>Opprettet av: {{ user.username }}</p>
            <p class="details-date">{{ new Date(location.createdAt).toLocaleString() }}</p>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import MapDetailsComponent from "@/components/MapDetailsComponent.vue";
import fetchLocationDetails from "@/components/fetch/fetchSingleLocation.js";
import fetchSingleUser from "@/components/fetch/fetchSingleUser.js";
import RcIcons from "@/components/RcIcons.js";


const route = useRoute();
const location = ref({});
const user = ref({});

onMounted(async () => {
    const locationId = route.params.id;
    try {
        location.value = await fetchLocationDetails(locationId);
        if (location.value) {
            user.value = await fetchSingleUser(location.value.userId);
        }
    } catch (error) {
        console.error('Error fetching location details:', error);
    }
});
const getIconUrl = (category) => {
    return RcIcons[category] || RcIcons['default'];
};
</script>

<style scoped>
.details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #444;
    margin: 20px;
    padding: 10px;
    border-radius: 10px;
    width: 80vw;
    height: 70vh;
    position: relative;
}
.details-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.details-date {
    font-style: italic;
    font-size: small;
}
.category-icon {
    height: 50px;
    width: 50px;
    position: absolute;
    top: 15px;
    left: 15px;
}
</style>

