<template>
    <h3>{{user.firstname}} {{user.lastname}}</h3>

</template>

<script setup>
import { state } from '@/components/user.js';
import fetchSingleUser from "@/components/fetch/fetchSingleUser.js";
import {onMounted, ref} from "vue";

const user = ref({})

onMounted(async () => {
    user.value = await fetchSingleUser(state.userId);
})

</script>


<style scoped>
h3 {
    text-align: center;
    font-family: "Agent Orange";
    margin: 20px;
}
</style>
