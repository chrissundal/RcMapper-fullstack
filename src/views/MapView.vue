<template>
  <div class="maps-container">
    <h3>Maps</h3>
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
}
h3 {
    text-align: center;
    font-family: "Agent Orange";
    margin: 20px;
}
</style>
