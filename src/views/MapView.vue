<template>
  <div class="maps-container">
    <h1>Maps</h1>
    <MapComponent />
  </div>
</template>
<script setup>
import MapComponent from "@/components/MapComponent.vue";
</script>
<style scoped>
h1 {
    text-align: center;
}
.maps-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
