<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useStore } from 'vuex';

const store = useStore();
</script>

<template>
  <header>
      <nav v-if="store.state.user !== null">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/profile">Profile</RouterLink>
        <RouterLink to="/map">Map</RouterLink>
      </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  max-height: 100px;
}

nav {
    width: 100%;
    font-size: 35px;
    text-align: center;
    margin-top: 0;
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
  border-left: 1px solid gray;
}

nav a:first-of-type {
  border: 0;
}

</style>
