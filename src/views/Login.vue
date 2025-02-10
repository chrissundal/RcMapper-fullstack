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
import { setUserId } from '@/components/user.js';
import {useRouter} from "vue-router";
const username = ref('');
const password = ref('');
const router = useRouter();
const login = () => {
    axios.post('https://localhost:3000/api/login', {
        username: username.value,
        password: password.value
    })
    .then(response => {
        console.log('Login successful:', response.data);
        setUserId(response.data.id);
        router.push(`/home`);
    })
    .catch(error => {
        console.error('Error logging in:', error.response?.data || error.message);
    });
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
