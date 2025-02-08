<template>
  <div class="details-container">
    <div v-if="location" class="details">
      <h1>{{ location.title }}</h1>
      <p>{{ location.description }}</p>
      <p>Opprettet av: {{ location.userId }}</p>
      <p>{{ new Date(location.createdAt).toLocaleString() }}</p>
      <p>Kategori: {{ location.category }}</p>
      <p>Latitude: {{ location.latitude }}</p>
      <p>Longitude: {{ location.longitude }}</p>
    </div>
    <div v-else>
        <h3>Laster...</h3>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import fetchLocationDetails from "@/components/fetchSingleLocation.js";


const route = useRoute();
const location = ref({});

onMounted(async () => {
  const locationId = route.params.id;
  try {
    location.value = await fetchLocationDetails(locationId);
  } catch (error) {
    console.error('Error fetching location details:', error);
  }
});
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
}
.details-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>
