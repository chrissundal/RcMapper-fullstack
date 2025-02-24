<template>
    <form @submit.prevent="register">
        <input v-model="newUsername" type="text" placeholder="Skriv inn brukernavn..." minlength="5" required>
        <input v-model="newPassword" type="new-password" placeholder="Skriv inn passord..." minlength="5" required>
        <input v-model="firstName" type="text" placeholder="Skriv inn fornavn..."  required>
        <input v-model="lastName" type="text" placeholder="Skriv inn etternavn..." required>
        <div class="register-select">
            <span style="color: #30c0ff">Velg favoritt kategori:</span>
            <select v-model="favCat" required>
                <option></option>
                <option value="Car">Bil</option>
                <option value="Crawler">Crawler</option>
                <option value="Plane">Fly</option>
                <option value="Drone">Drone</option>
                <option value="Quad">Quad</option>
                <option value="Gereral">Generelt</option>
            </select>
        </div>
        <h4 v-if="errorMessage" class="error-message">{{ errorMessage }}</h4>
        <div class="registration-buttons">
            <button class="submit-reg" type="submit">Opprett bruker</button>
            <button class="cancel-reg" @click="cancelRegistration">Avbryt</button>
        </div>
    </form>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
const emit = defineEmits(['closeRegister']);

const newUsername = ref('');
const newPassword = ref('');
const firstName = ref('');
const lastName = ref('');
const favCat = ref('');
const errorMessage = ref('');
const cancelRegistration = () => {
    emit('closeRegister')
}
const register = () => {
    axios.post('https://localhost:3000/api/users', {
        username: newUsername.value,
        password: newPassword.value,
        firstname: firstName.value,
        lastname: lastName.value,
        admin: false,
        banned: false,
        favCategory: favCat.value,
    })
        .then(response => {
            emit('closeRegister')
        })
        .catch(error => {
            errorMessage.value = error.response.data;
        });
};
</script>

<style scoped>
.register-select {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 90vw;
    max-width: 500px;
    padding: 5px;
}
.register-select select {
    width: 25vw;
    max-width: 200px;
    padding: 5px;
    font-family: "Agency FB";
    font-weight: bold;
    font-size: large;
    border-radius: 7px;
    outline: none;
}
.submit-reg, .cancel-reg {
    width: 130px;
    height: 40px;
    margin: 5px;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 7px;
    transition: 0.3s ease;
    font-size: medium;

}
.cancel-reg:hover {
    background: red;
}
.submit-reg:hover {
    background: green;
}
h4 {
    color: red;
    font-size: medium;
    font-weight: bold;
}
form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 10px;
}
input {
    width: 95%;
    max-width: 500px;
    background: white;
    outline: none;
    border: none;
    border-radius: 7px;
}
</style>

