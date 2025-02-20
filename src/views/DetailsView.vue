<template>
    <div class="details-container">
        <div v-if="location" class="details">
            <h1>{{ location.title }}</h1>
            <p class="details-city">By: {{ location.city}}</p>
            <img :src="getIconUrl(location.category)" alt="Category Icon" class="category-icon" />
            <img :src="favorite ? '/icons/heartred.png' : '/icons/heart.png'" alt="Favorite Icon" class="favorite" @click="toggleFavorite" />
            <div class="ratingScore" v-if="averageRating">{{ averageRating.toFixed(1) }}</div>
            <MapDetailsComponent :location="location" />
            <div class="location-info-container">
                <WeatherComponent :location="location" />
                <div class="location-description">
                    <p>{{ location.description }}</p>
                </div>
            </div>

            <div class="rating-container">
                <div class="stars" v-if="!hasRated">
                    <span v-for="star in 5" :key="star" @click="rateLocation(star)">
                        <i :class="star <= rating ? 'filled-star' : 'empty-star'">&#9733;</i>
                    </span>
                </div>
            </div>

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
import {useRoute} from 'vue-router';
import MapDetailsComponent from "@/components/MapDetailsComponent.vue";
import fetchLocationDetails from "@/components/fetch/fetchSingleLocation.js";
import fetchSingleUser from "@/components/fetch/fetchSingleUser.js";
import RcIcons from "@/components/RcIcons.js";
import fetchFavorites from "@/components/fetch/fetchFavorites.js";
import {useStore} from "vuex";
import axios from "axios";
import WeatherComponent from "@/components/WeatherComponent.vue";
import PostRating from "@/components/post/postRating.js";
import fetchRatings from "@/components/fetch/fetchRatings.js";

const route = useRoute();
const location = ref({});
const store = useStore();
const user = ref({});
const favorite = ref(null);
const rating = ref(0);
const averageRating = ref(null);
const ratings = ref([]);
const hasRated = ref(false);

onMounted(async () => {

    try {
        location.value = await fetchLocationDetails(route.query.id);
        if (location.value) {
            user.value = await fetchSingleUser(location.value.userId);
        }
        const favoriteData = await fetchFavorites(store.state.user.id)
        for (let fav of favoriteData) {
            if (fav.locationId == route.query.id) {
                favorite.value = true;
                break;
            }
        }
        await fetchAllRatings()
    } catch (error) {
        console.error('Feil ved henting av location:', error);
    }
});
const fetchAllRatings = async () => {
    let score = 0;
    ratings.value = await fetchRatings(route.query.id)
    if (ratings.value.length > 0) {
    for (let r of ratings.value) {
        score += r.rating;
        if (r.userId == store.state.user.id) {
            hasRated.value = true;
        }
    }
    averageRating.value = score / ratings.value.length;
    }
}

const toggleFavorite = async () => {
    const locationId = route.query.id;
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
const rateLocation = async (star) => {
    rating.value = star;
    let newrating = {
        userId: store.state.user.id,
        locationId: route.query.id,
        rating: rating.value,
        createdAt: new Date(),
    }
    await PostRating(newrating)
    await fetchAllRatings()
};
</script>

<style scoped>
.location-info-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    width: 100%;
    margin-top: 10px;
    text-align: center;
}

.location-description {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background: #30c0ff;
    border-radius: 10px;
    min-width: 26vw;
    min-height: 10vh;
    height: auto;
    color: white;
    padding: 10px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    margin-top: 0px;
}

.details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #444;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    width: 90vw;
    max-width: 700px;
    height: auto;
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
    padding: 0;
}

.details-date {
    font-style: italic;
    font-size: 11px;
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
    cursor: pointer;
}

.details-city {
    margin-top: 0px;
}
.rating-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    font-size: x-large;
}

.stars {
    display: flex;
    gap: 5px;
}

.filled-star {
    color: gold;
    cursor: pointer;
}

.empty-star {
    color: lightgray;
    cursor: pointer;
}
.ratingScore {
    position: absolute;
    top: 80px;
    left: 25px;
    color: gold;
    font-size: x-large;
}
</style>

