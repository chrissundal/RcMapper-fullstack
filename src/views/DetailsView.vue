<template>
    <div class="details-container">
        <div v-if="location" class="details">
            <h1>{{ location.title }}</h1>
            <p>{{ location.description }}</p><br>
            <img :src="getIconUrl(location.category)" alt="Category Icon" class="category-icon" />
            <img :src="favorite ? '/icons/heartred.png' : '/icons/heart.png'" alt="Favorite Icon" class="favorite" @click="toggleFavorite" />
            <MapDetailsComponent :location="location" />
            <p>Opprettet av: {{ user.username }}</p>
            <span class="details-date">{{ new Date(location.createdAt).toLocaleString() }}</span>
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
import fetchFavorites from "@/components/fetch/fetchFavorites.js";
import {useStore} from "vuex";
import axios from "axios";


const route = useRoute();
const location = ref({});
const store = useStore();
const user = ref({});
const favorite = ref(null);

onMounted(async () => {
    try {
        location.value = await fetchLocationDetails(route.params.id);
        if (location.value) {
            user.value = await fetchSingleUser(location.value.userId);
        }
        const favoriteData = await fetchFavorites(store.state.user.id)
        for (let fav of favoriteData) {
            if (fav.locationId == route.params.id) {
                favorite.value = true;
                break;
            }
        }
    } catch (error) {
        console.error('Feil ved henting av location:', error);
    }
});
const toggleFavorite = async () => {
    const locationId = route.params.id;
    const userId = store.state.user.id;

    try {
        if (favorite.value) {
            await axios.delete(`https://localhost:3000/api/favorites`, { data: { userId, locationId } });
            favorite.value = false;
        } else {
            await axios.post(`https://localhost:3000/api/favorites`, { userId, locationId });
            favorite.value = true;
        }
    } catch (error) {
        console.error('Feil ved oppdatering av favoritt:', error);
    }
};
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
    font-family: "Agency FB";
    font-weight: bold;
}
.details-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.details-container p {
    font-size: 17px;
}
.details-date {
    font-style: italic;
    font-size: 10px;
    font-family: "Agency FB";
}
.category-icon {
    height: 50px;
    width: 50px;
    position: absolute;
    top: 15px;
    left: 15px;
}
.favorite {
    height: 50px;
    width: 50px;
    position: absolute;
    top: 15px;
    right: 15px;
}
</style>

