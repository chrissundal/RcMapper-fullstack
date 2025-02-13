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
}
h3 {
    text-align: center;
    margin: 20px;
}
.filter-buttons {
    display: flex;
    margin: 10px;
}
</style>
