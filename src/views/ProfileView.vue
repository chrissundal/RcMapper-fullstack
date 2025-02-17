<template>
    <h3>{{user.firstname}} {{user.lastname}}</h3>
    <button>Logg ut</button>
    <button>Endre</button>
    <button v-if="user.admin">Endre brukere</button>
    <h3>Favoritter:</h3>
    <FavoriteComponent :user="user" />
</template>

<script setup>
import {onMounted, ref} from "vue";
import { useStore } from 'vuex';
import FavoriteComponent from "@/components/FavoriteComponent.vue";
const store = useStore();

const user = ref({})
const editUser = ref(false);
const editAdmin = ref(false);

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
</style>
