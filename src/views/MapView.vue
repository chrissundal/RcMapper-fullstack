<template>
  <div class="maps-container">
    <MapComponent />
  </div>
</template>
<script setup>
import MapComponent from "@/components/MapComponent.vue";
</script>
<style scoped>

.maps-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
}
</style>
