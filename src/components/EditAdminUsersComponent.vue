<template>
    <div class="edit-admin-container">
        <h3>Admin:</h3>
        <input type="text" v-model="input" placeholder="Søk etter brukernavn..." />
        <table class="admin-table">
            <thead>
            <tr>
                <th>Brukernavn</th>
                <th>Navn</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in filteredUsers" :key="user.id" @click="toggleAdminChoice(user)">
                <td>{{user.username}}</td>
                <td>{{user.firstname}} {{user.lastname}}</td>
                <td>
                    <div class="admin-tags">
                        <div v-if="user.banned">
                            <img src="/icons/ban.png" alt="ban">
                        </div>
                        <div v-else>
                            <img src="/icons/ok.png" alt="ok">
                        </div>
                        <div v-if="user.admin">
                            <img src="/icons/admin.png" alt="admin">
                        </div>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
        <div v-if="!filteredUsers.length" class="admin-search-error">Ingen resultat funnet</div>
        <button @click="closeAdmin">Lukk</button>
        <Transition name="fade">
            <div class="admin-popup-choices" v-if="adminChoiceOpen">
                <h3>{{selectedUser.firstname}} {{selectedUser.lastname}}</h3>
                <button @click="toggleBanned">ban</button>
                <button @click="deleteAdminUser">delete</button>
                <button @click="toggleAdmin">set admin</button>
                <button @click="toggleAdminChoice">Lukk</button>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import fetchUsers from "@/components/fetch/fetchUsers.js";
import putUser from "@/components/put/putUser.js";
import deleteUser from "@/components/delete/deleteUser.js";

const emit = defineEmits(['toggleAdmin']);
const users = ref([]);
const selectedUser = ref(null)
const adminChoiceOpen = ref(false);
const input = ref('')
const closeAdmin = () => {
    emit('toggleAdmin');
}
const toggleAdminChoice = (user) => {
    adminChoiceOpen.value = !adminChoiceOpen.value;
    selectedUser.value = user;
}
const toggleBanned = async () => {
    selectedUser.value.banned = !selectedUser.value.banned;
    let success = await putUser(selectedUser.value)
    if (success) {
        await getAllUsers()
        toggleAdminChoice()
    }
}
const toggleAdmin = async () => {
    selectedUser.value.admin = !selectedUser.value.admin;
    let success = await putUser(selectedUser.value)
    if (success) {
        await getAllUsers()
        toggleAdminChoice()
    }
}
const deleteAdminUser = async () => {
    let success = await deleteUser(selectedUser.value.id)
    if (success) {
        await getAllUsers()
        toggleAdminChoice()
    }
}
const getAllUsers = async () => {
    try {
        let unSortedUsers = await fetchUsers()
        users.value = unSortedUsers.sort((a, b) => a.username.localeCompare(b.username))
    } catch (error) {
        console.log(error.message);
    }
}
const filteredUsers = computed(() => {
    return users.value.filter(user => user.username.toLowerCase().includes(input.value.toLowerCase()))
});

onMounted(() => {
    getAllUsers()
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: 600ms ease all;
}
.fade-enter-from, .fade-leave-to{
    opacity: 0;
}

.edit-admin-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
}
.edit-admin-container img {
    height: 30px;
    width: 30px;
}
input {
    border: none;
    outline: none;
    width: 60vw;
    max-width: 400px;
}
table.admin-table {
    max-width: 700px;
    border-collapse: collapse;
    margin: 20px 0;
    overflow: hidden;
}

th, td {
    padding: 12px;
    text-align: left;
}

th {
    font-size: larger;
    text-align: center;
}

td {
    width: 20vw;
    text-align: center;
}

tbody tr {
    transition: background-color 0.3s;
}

tbody tr:hover td {
    background-color: #f1f1f1;
    cursor: pointer;
}
h3 {
    text-align: center;
}
button {
    cursor: pointer;
    border: none;
    width: 20vw;
}
.admin-popup-choices {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: lightgray;
    gap: 15px;
    width: 100%;
    padding: 10px;
    position: absolute;
    height: 100%;
}
.admin-popup-choices h3 {
    margin: 0;
}
.admin-popup-choices button {
    width: 35vw;
    max-width: 250px;
    padding: 10px;
    font-size: 18px;
}
.admin-tags {
    display: flex;
    justify-content: center;
    align-items: center;
}
.admin-search-error {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: 10px;
}
</style>
