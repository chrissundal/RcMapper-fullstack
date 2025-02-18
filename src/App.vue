<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useStore } from 'vuex';

const store = useStore();
</script>

<template>
  <header v-if="store.state.user !== null">
      <h2>RcMapper</h2>
      <nav>
        <RouterLink to="/">Chat</RouterLink>
        <RouterLink to="/profile">Profil</RouterLink>
        <RouterLink to="/map">Kart</RouterLink>
      </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  max-height: 60px;
}
header h2 {
    text-align: center;
    font-family: "Glossy Sheen";
    margin: 0;
}
nav {
    width: 100%;
    font-size: 35px;
    text-align: center;
    margin-top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Glossy Sheen";
}

nav a.router-link-exact-active {
  color: gray;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
    font-size: 25px;
  display: flex;
  padding: 0 1rem;
    width: 80px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

nav a:first-of-type {
  border: 0;
}

</style>
