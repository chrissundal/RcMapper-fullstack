<template>
  <div class="home-view">
        <chatComponent />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import chatComponent from "@/components/chatComponent.vue";

const store = useStore();
const user = ref({});

onMounted(async() => {
    user.value = store.state.user;
});

</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
    padding: 10px;
}

</style>
