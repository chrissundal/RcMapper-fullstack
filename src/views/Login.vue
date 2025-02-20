<template>
    <div class="main-login-container">
        <div class="login-container">
            <img src="/icons/rcmapper.jpg" alt="RcMapper">
            <input v-model="username" placeholder="Skriv inn brukernavn..." />
            <input v-model="password" type="password" placeholder="Skriv inn passord..." />
            <h4 v-if="errorMessage" class="error-message">{{ errorMessage }}</h4>
            <button @click="login">Login</button>
            <div>
                Ikke medlem? <span @click="registerUser=true">Registrer</span>
            </div>
        </div>
        <div v-if="registerUser" class="register-container">
            <RegisterComponent  @closeRegister="CloseRegister"/>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from "vue-router";
import { useStore } from 'vuex';
import RegisterComponent from "@/components/RegisterComponent.vue";

const username = ref('');
const password = ref('');
const router = useRouter();
const store = useStore();
const registerUser = ref(false)
const errorMessage = ref('')

const login = () => {
    errorMessage.value = '';
    axios.post('https://localhost:3000/api/login', {
        username: username.value,
        password: password.value
    })
    .then(response => {
        store.dispatch('login', response.data);
        router.push(`/map`);
    })
    .catch(error => {
        errorMessage.value = error.response.data;
    });
};
const CloseRegister = () => {
    registerUser.value = false;
}
</script>

<style scoped>
.login-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    font-weight: bold;
}
.login-container img{
    width: 90vw;
    max-width: 500px;
    border-radius: 10px;
}
input {
    width: 300px;
    font-family: "Agency FB";
    font-weight: bold;
}
.login-container button {
    border: none;
    width: 100px;
    padding: 10px;
    border-radius: 10px;
    font-size: medium;
    transition: 0.3s ease;
}

span {
    color: #30c0ff;
    transition: 0.3s ease;
}
span:hover {
    cursor: pointer;
    font-size: medium;
}
.register-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(68, 68, 68, 0.85);
    position: absolute;
    width: 100%;
    height: 100vh;
    border-radius: 10px;
}
.main-login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}

</style>
