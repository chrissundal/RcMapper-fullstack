<template>
    <Transition name="page" v-if="store.state.user !== null">
        <header>
            <h2>RcMapper<span style="font-size: small">{{headerText}}</span></h2>
            <nav>
                <RouterLink to="/chat">Chat</RouterLink>
                <RouterLink to="/profile">Profil</RouterLink>
                <RouterLink to="/map">Kart</RouterLink>
            </nav>
        </header>
    </Transition>

  <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
          <Component :is="Component"/>
      </Transition>
  </RouterView>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useStore } from 'vuex';
import { ref, watch, computed } from 'vue';

const store = useStore();
const headerText = ref('');

const user = computed(() => store.state.user);

const checkAdmin = () => {
    headerText.value = user.value && user.value.admin ? ': admin' : '';
};

watch(user, (newUser) => {
    if (newUser !== null) {
        checkAdmin();
    } else {
        headerText.value = '';
    }
}, { immediate: true });

if (user.value !== null) {
    checkAdmin();
}
</script>

<style scoped>
.page-enter-active, .page-leave-active {
    transition: 600ms ease all;
}
.page-enter-from, .page-leave-to {
    opacity: 0;
}
header {
    max-height: 60px;
    margin: 0;
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
    margin: 0;
}

nav a:first-of-type {
  border: 0;
}

</style>
