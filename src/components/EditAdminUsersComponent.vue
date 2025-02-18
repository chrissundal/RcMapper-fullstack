<template>
    <div class="edit-admin-container">
        <h3>admin users</h3>
        <table class="admin-table">
            <thead>
            <tr>
                <th>Brukernavn</th>
                <th>Navn</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in users" :key="user.id" @click="toggleBanned(user)">
                <td>{{user.username}}</td>
                <td>{{user.firstname}} {{user.lastname}}</td>
                <td><div v-if="user.banned">
                    <img src="/icons/ban.png" alt="ban">
                </div>
                    <div v-else>
                        <img src="/icons/ok.png" alt="ok">
                    </div></td>
            </tr>
            </tbody>
        </table>
        <button @click="closeAdmin">Lukk</button>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import fetchUsers from "@/components/fetch/fetchUsers.js";
import putUser from "@/components/put/putUser.js";

const emit = defineEmits(['toggleAdmin']);
const users = ref([]);
const closeAdmin = () => {
    emit('toggleAdmin');
}
const toggleBanned = async (user) => {
    if(confirm("Er du sikker?")){
        user.banned = !user.banned;
        const success = await putUser(user)
        if (success) {
            await getAllUsers()
        }
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
onMounted(() => {
    getAllUsers()
})
</script>

<style scoped>
.edit-admin-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.edit-admin-container img {
    height: 30px;
    width: 30px;
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
</style>
