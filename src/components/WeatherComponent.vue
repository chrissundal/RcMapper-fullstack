<template>
    <div>
        <div v-if="weather" class="weather-container">
            <i :class="`owi owi-${weather.weather[0].icon}`"></i>
            <div class="weather-info">
                <span>Temperatur: {{ weather.main.temp }}°C</span>
                <span>Føles som: {{weather.main.feels_like}}°C</span>
                <div>
                <span>Vind: {{weather.wind.speed}}m/s</span> <span style="font-size: large">{{windDirection(weather.wind.deg)}}</span>
                </div>
                <span v-if="weather.rain">Nedbør: {{ weather.rain['1h'] }} mm</span>
                <span v-else-if="weather.snow">Snøfall: {{ weather.snow['1h'] }} mm</span>
            </div>
        </div>
        <div v-else>
            <p>Loading weather data...</p>
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref, watchEffect} from 'vue';
import '@/assets/open-weather-icons.css';
import windDirection from '@/components/windDirection.js'
import getWeather from "@/components/fetch/fetchWeather.js";

const props = defineProps({
    location: {
        type: Object,
        required: true,
    },
});

const weather = ref(null);

const fetchWeather = async () => {
    if (props.location.latitude && props.location.longitude) {
        weather.value = await getWeather(props.location.latitude, props.location.longitude);
    }
};

onMounted(() => {
    fetchWeather()
});

watchEffect(() => {
    if (props.location.latitude && props.location.longitude) {
        fetchWeather();
    }
});
</script>

<style scoped>
.weather-container {
    margin-top: 10px;
    margin-bottom: 0px;
}

.weather-container i {
    font-size: 60px;
}

.weather-info {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    width: 150px;
    align-items: center;
    justify-content: center;
    color: white;
    padding: 5px;
}
.weather-info p, span {
    font-size: medium;
    line-height: 1.5;
}
</style>
