<template>
  <div class="home-view">
    <h3>Home</h3>

    <div v-if="users">
      <ul>
        <li v-for="user in users" :key="user.id">{{ user.firstname }}</li>
      </ul>
    </div>

    <div v-if="singleUser">
      <h4>Fetched User with ID 1</h4>
      <p>{{ singleUser.firstname }} {{ singleUser.lastname }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import fetchSingleUser from "@/components/fetch/fetchSingleUser.js";
import fetchUsers from "@/components/fetch/fetchUsers.js";
import { state } from '@/components/user.js';

const users = ref([]);
const singleUser = ref(null);

onMounted(async() => {
    users.value = await fetchUsers();
    singleUser.value = await fetchSingleUser(1);
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
    font-family: "Agent Orange";
    margin: 20px;
}
</style>
