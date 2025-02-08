<template>
    <div class="login-container">
        <input v-model="username" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <button @click="login">Login</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const username = ref('');
const password = ref('');

const login = async () => {
    try {
        const response = await axios.post('https://localhost:3000/api/login', {
            username: username.value,
            password: password.value
        });

        console.log('Login successful:', response.data);
    } catch (error) {
        console.error('Error logging in:', error.response?.data || error.message);
    }
};
</script>

<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
}
</style>
