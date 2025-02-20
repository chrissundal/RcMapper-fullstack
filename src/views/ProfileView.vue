<template>
    <div class="profile-container">
        <div class="profile-btn" v-if="!isEditAdmin && !isEditUser">
            <button @click="logout">Logout</button>
            <button @click="toggleEditUser">Endre</button>
            <button v-if="user.admin" @click="toggleEditAdmin">Admin</button>
        </div>
        <h3>{{user.firstname}} {{user.lastname}}</h3>
        <Transition name="fade">
            <div v-if="isEditUser" class="editUser">
                <EditUserComponent @toggleUser="toggleEditUser"/>
            </div>
        </Transition>
        <Transition name="fade">
            <div v-if="isEditAdmin" class="editUser">
                <EditAdminUsersComponent @toggleAdmin="toggleEditAdmin"/>
            </div>
        </Transition>
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
.fade-enter-active, .fade-leave-active {
    transition: 600ms ease all;
}
.fade-enter-from, .fade-leave-to{
    opacity: 0;
}
.fade-enter-active {
    transition: opacity 0.5s ease-in-out 0.2s;
    }
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
    padding: 10px;
}
.profile-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    height: 40px;
    text-align: center;
}
.profile-btn button {
    width: 17vw;
    max-width: 120px;
    font-size: 0.9em;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    height: 30px;
    transition: 0.4s ease;
}
.profile-container {
    margin-top: 10px;
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
