<template>
    <div>
        <h3>Favoritter:</h3>
        <div v-if="favorites.length" class="favorites-container">
            <table class="favorites-table">
                <thead>
                <tr>
                    <th>Type</th>
                    <th>Sted</th>
                    <th>By</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="favorite in favorites" :key="favorite.favoriteId" @click="goToLocation(favorite.locationId)">
                    <td><img :src="getIconUrl(favorite.category)" alt="Category Icon" class="favorite-category-icon"/></td>
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
import RcIcons from "@/components/RcIcons.js";

const router = useRouter();
const store = useStore();
const favorites = ref([])
const goToLocation = (locationId) => {
    router.push(`/details/${locationId}`);
};
const getIconUrl = (category) => {
    return RcIcons[category] || RcIcons['default'];
};
const addFavorites = async () => {
    try {
        const favoriteData = await fetchFavorites(store.state.user.id)
        for (let favorite of favoriteData) {
            const locationDetails = await fetchLocationDetails(favorite.locationId);
            favorite.locationTitle = locationDetails.title;
            favorite.city = locationDetails.city;
            favorite.category = locationDetails.category;
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
    max-width: 700px;
    border-collapse: collapse;
    margin: 20px 0;
    overflow: hidden;
}

th, td {
    padding: 12px;
    text-align: left;
}

th {
    font-size: larger;
    text-align: center;
}

td {
    width: 20vw;
    text-align: center;
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
.favorite-category-icon {
    height: 25px;
    width: 25px;
}
</style>
