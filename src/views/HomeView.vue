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
    margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
    background: lightgray;
    border-radius: 10px;
    padding: 10px;
}

</style>
