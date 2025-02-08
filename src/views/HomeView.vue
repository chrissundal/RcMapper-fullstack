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

const users = ref([]);
const singleUser = ref(null);

const fetchUsers = async () => {
  try {
    const response = await fetch('https://localhost:3000/api/users');
    const data = await response.json();
    users.value = data;
    console.log('Fetched users:', data);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

const fetchUser = async () => {
  try {
    const response = await fetch('https://localhost:3000/api/users/1');
    const data = await response.json();
    singleUser.value = data;
    console.log('Fetched user with ID 1:', data);
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}

onMounted(() => {
  fetchUsers();
  fetchUser();
});
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
