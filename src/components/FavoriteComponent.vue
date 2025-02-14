<template>
    <div>
        <div v-if="favorites.length" class="favorites-container">
            <table class="favorites-table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>City</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="favorite in favorites" :key="favorite.favoriteId" @click="goToLocation(favorite.locationId)">
                    <td>{{ favorite.locationTitle }}</td>
                    <td>{{ favorite.city }}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <h3>Ingen favoritter her...</h3>
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
    try {
        const favoriteData = await fetchFavorites(store.state.user.id)
        for (let favorite of favoriteData) {
            const locationDetails = await fetchLocationDetails(favorite.locationId);
            favorite.locationTitle = locationDetails.title;
            favorite.city = locationDetails.city;
        }
        favorites.value = favoriteData;
    } catch (err) {
        console.log(err);
    }
};
onMounted(async () => {
    await addFavorites();
})
</script>

<style scoped>
.favorites-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
table.favorites-table {
    width: 80vw;
    max-width: 500px;
    border-collapse: collapse;
    margin: 20px 0;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid white;
}

th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
}
th {
    font-family: "Glossy Sheen";
}
th {
    background: #30c0ff;
    color: white;
    font-size: larger;
}

td {
    background-color: #fff;
}

tbody tr {
    transition: background-color 0.3s;
}

tbody tr:hover td {
    background-color: #f1f1f1;
    cursor: pointer;
}
h3 {
    text-align: center;
}
</style>
