<template>
    <form @submit.prevent="register">
        <input v-model="newUsername" type="text" placeholder="Skriv inn brukernavn..." minlength="5" required>
        <input v-model="newPassword" type="new-password" placeholder="Skriv inn passord..." minlength="5" required>
        <input v-model="firstName" type="text" placeholder="Skriv inn fornavn..."  required>
        <input v-model="lastName" type="text" placeholder="Skriv inn etternavn..." required>
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
        banned: false
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
.registration-buttons {

}
.submit-reg, .cancel-reg {
    width: 130px;
    height: 40px;
    margin: 5px;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 10px;
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
    width: 300px;
    background: white;
}
button:hover {
    cursor: pointer;
    color: white;
    transform: scale(1.03);
    background-color: #30c0ff;
}
</style>

