<template>
    <div class="profile-container">
        <h3>{{user.firstname}} {{user.lastname}}</h3>
        <div class="profile-btn" v-if="!isEditAdmin && !isEditUser">
            <button @click="logout">Logg ut</button>
            <button @click="toggleEditUser">Endre</button>
            <button v-if="user.admin" @click="toggleEditAdmin">Endre brukere</button>
        </div>
        <div v-if="isEditUser" class="editUser">
            <EditUserComponent @toggleUser="toggleEditUser"/>
        </div>
        <div v-if="isEditAdmin" class="editUser">
            <EditAdminUsersComponent @toggleAdmin="toggleEditAdmin"/>
        </div>
        <div class="favorite-container">

            <FavoriteComponent :user="user" />
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import { useStore } from 'vuex';
import FavoriteComponent from "@/components/FavoriteComponent.vue";
import EditUserComponent from "@/components/EditUserComponent.vue";
import EditAdminUsersComponent from "@/components/EditAdminUsersComponent.vue";
import {useRouter} from "vue-router";
const store = useStore();
const router = useRouter();
const user = ref({})
const isEditUser = ref(false);
const isEditAdmin = ref(false);

const toggleEditUser = () => {
    isEditUser.value = !isEditUser.value;
    isEditAdmin.value = false;
}
const logout = () => {
    store.dispatch('logout');
    router.push(`/`);
}
const toggleEditAdmin = () => {
    isEditAdmin.value = !isEditAdmin.value;
    isEditUser.value = false;
}
onMounted(async () => {
    user.value = store.state.user;
})

</script>


<style scoped>
h3 {
    text-align: center;
    font-family: "Glossy Sheen";
    margin: 20px;
}
.editUser {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: lightgray;
    border-radius: 10px;
    margin-top: 10px;
    padding: 10px;
}
.profile-btn {
    display: flex;
    justify-content: center;
    gap: 5px;
}
.profile-btn button {
    width: 10vw;
    min-width: 100px;
    max-width: 170px;
    border: none;
}
.profile-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.favorite-container {
    margin-top: 10px;
    width: 100%;
    height: 100%;
    background: lightgray;
    border-radius: 10px;
    padding: 10px;
}
</style>
