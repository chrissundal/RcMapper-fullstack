<template>
    <h3>{{user.firstname}} {{user.lastname}}</h3>

</template>

<script setup>
import {onMounted, ref} from "vue";
import { useStore } from 'vuex';
const store = useStore();

const user = ref({})

onMounted(async () => {
    user.value = store.state.user;
})

</script>


<style scoped>
h3 {
    text-align: center;
    font-family: "Agent Orange";
    margin: 20px;
}
</style>
