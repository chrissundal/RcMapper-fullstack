<template>
  <div class="home-view">
    <h3>Home</h3>

    <div v-if="users">
      <ul>
        <li v-for="user in users" :key="user.id">{{ user.firstname }}</li>
      </ul>
    </div>

    <div v-if="user">
      <h4>Fetched User with ID {{user.id}}</h4>
      <p>{{ user.firstname }} {{ user.lastname }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import fetchUsers from "@/components/fetch/fetchUsers.js";

const store = useStore();
const users = ref([]);
const user = ref({});

onMounted(async() => {
    users.value = await fetchUsers();
    user.value = store.state.user;
});
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
h3 {
    text-align: center;
    font-family: "Glossy Sheen";
    margin: 20px;
}
</style>
