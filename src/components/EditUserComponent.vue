<template>
    <h3>Endre bruker</h3>
    <div v-if="user !== null" class="edit-user">
        Fornavn: <input type="text" v-model="firstname"/>
        Etternavn: <input type="text" v-model="lastname"/>
        Brukernavn: <input type="text" v-model="username"/>
        Passord: <input type="text" v-model="password"/>
        <div>{{message}}</div>
        <div class="edit-user-btn">
            <button @click="updateUser">Lagre</button>
            <button @click="closeUser">Avbryt</button>
        </div>
    </div>
</template>

<script setup>
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
import putUser from "@/components/put/putUser.js";

const store = useStore();
const emit = defineEmits(['toggleUser']);
const firstname = ref('');
const lastname = ref('');
const username = ref('');
const password = ref('');
const user = ref(null);
const message = ref('');

const updateUser = async () => {
    message.value = '';
    if (firstname.value !== user.value.firstname) {
        user.value.firstname = firstname.value;
    }
    if (lastname.value !== user.value.lastname) {
        user.value.lastname = lastname.value;
    }
    if (username.value !== user.value.username) {
        user.value.username = username.value;
    }
    if (password.value !== user.value.password) {
        user.value.password = password.value;
    }
    const success = await putUser(user.value);
    if (success) {
        await store.dispatch('login', user.value);
        message.value = 'Bruker lagret';
        setTimeout(() => {
            emit('toggleUser')
        },2000);
    } else {
        message.value = 'Bruker ikke lagret';
    }
};
const closeUser = () => {
    firstname.value = '';
    lastname.value = '';
    username.value = '';
    password.value = '';
    emit('toggleUser');
}
const setValues = () => {
    firstname.value = user.value.firstname;
    lastname.value = user.value.lastname;
    username.value = user.value.username;
    password.value = user.value.password;
};

onMounted(() => {
    if(store.state.user) {
        user.value = store.state.user;
        setValues();
    }
});
</script>

<style scoped>
.edit-user {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
}
.edit-user input {
    width: 50vw;
    border: none;
}
.edit-user-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
}
.edit-user-btn button {
    margin-top: 10px;
    border: none;
    width: 15vw;
}
</style>
