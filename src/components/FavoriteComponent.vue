<template>
    <div>
        <div v-if="favorites.length" class="fav-container">
            <div v-for="favorite in favorites" :key="favorite.favoriteId">
                <button @click="goToLocation(favorite.locationId)">{{ favorite.locationTitle }}</button>
            </div>
        </div>
        <div v-else>
            <h3>Ingen favoritter lagt til...</h3>
        </div>
    </div>
</template>
<script setup>
import {onMounted, ref} from "vue";
import fetchLocationDetails from "@/components/fetch/fetchSingleLocation.js";
import { useRouter } from 'vue-router';
import fetchFavorites from "@/components/fetch/fetchFavorites.js";
import {useStore} from "vuex";
const router = useRouter();
const store = useStore();

const favorites = ref([])
const goToLocation = (locationId) => {
    router.push(`/details/${locationId}`);
};
const addFavorites = async () => {
    const favoriteData = await fetchFavorites(store.state.user.id)
        for (let favorite of favoriteData) {
            const locationDetails = await fetchLocationDetails(favorite.locationId);
            favorite.locationTitle = locationDetails.title;
        }
        favorites.value = favoriteData;
};
onMounted(async () => {
    await addFavorites();
})
</script>

<style scoped>
.fav-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 5px;
}
button {
    border: none;
    font-size: large;
    padding: 10px;
    transition: 0.4s ease;
}
</style>
