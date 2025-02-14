<template>
  <div class="home-view">
      <div v-if="!openChat">
          <button @click="ToggleChat">Chat</button>
      </div>
    <div v-if="openChat">
        <chatComponent @closeChat="ToggleChat"/>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import chatComponent from "@/components/chatComponent.vue";

const store = useStore();
const openChat = ref(false);
const user = ref({});
const ToggleChat = () => {
    openChat.value = !openChat.value;
}

onMounted(async() => {
    user.value = store.state.user;
});

</script>

<style scoped>
.home-view {
    margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
h3 {
    text-align: center;
    font-family: "Glossy Sheen";
    margin: 20px;
}
</style>
