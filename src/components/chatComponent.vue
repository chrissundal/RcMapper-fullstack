<template>
        <div class="filter-buttons">
            <button
                v-for="filter in filters.slice(0, -1)"
                :key="filter.value"
                @click="setChat(filter)"
                :class="{ active: activeFilter === filter.value }"
                :disabled="activeFilter === filter.value">
                {{ filter.label }}
            </button>
        </div>
    <div class="chat-container">
        <div v-if="chats.length" class="chats">
            <div v-for="chat in chats" :key="chat.id" :class="['chat-item', { 'own-chat': chat.username === store.state.user.username }]" >
                <div>
                    <div class="chat-text"><strong style="color: black">{{ chat.username }}:</strong> {{ chat.message }}</div>
                    <div v-if="chat.username === store.state.user.username || store.state.user.admin" class="delete-chat" @click="deleteChatpost(chat.chatId)"></div>
                    <div class="date-chat">{{new Date(chat.createdAt).toLocaleString()}}</div>
                </div>
            </div>
        </div>
        <div v-else>
            <h3>No chats available...</h3>
        </div>
        <div class="send-chat">
            <input type="text" v-model="message" placeholder="Skriv din melding her..." />
            <button @click="sendChat">Send</button>
        </div>
    </div>
</template>

<script setup>
import filters from "@/components/CategoryFilters.js";
import {ref, onMounted, watch} from "vue";
import fetchChatByCategory from "@/components/fetch/fetchChatByCategory.js";
import {useStore} from "vuex";
import PostChat from "@/components/post/postChat.js";
import deleteChat from "@/components/delete/deleteChat.js";

const emit = defineEmits(['closeChat']);
const store = useStore();
const activeFilter = ref(filters[0].value);
const categoryName = ref(filters[0].label)
const chats = ref([]);
const message = ref('')
const deleteChatpost = async (id) => {
    try {
        await deleteChat(id)
        await fetchChats();
    } catch (error) {
        console.error(error);
    }
}

const sendChat = async () => {
    let newChat = {
        username: store.state.user.username,
        category: activeFilter.value,
        message: message.value,
        createdAt: new Date()
    }
    try {
        await PostChat(newChat);
        await fetchChats();
    } catch (error) {
        console.log(error);
    }
    message.value = "";
}
const setChat = async (filter) => {
    activeFilter.value = filter.value;
    categoryName.value = filter.label;
    await fetchChats();
};
const fetchChats = async () => {
    try {
        const filteredChats = await fetchChatByCategory(activeFilter.value);
            chats.value = filteredChats.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
        chats.value = [];
    }
};

watch(activeFilter, fetchChats);

onMounted(fetchChats);

</script>

<style scoped>
.filter-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    height: 40px;
}
.filter-buttons button {
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
.filter-buttons button:hover {
    transform: scale(1.05);
}
.filter-buttons button.active {
    color: white;
}
.filter-buttons button.active:hover {
    transform: scale(1);
    cursor: default;
}
.filter-buttons button:disabled {
    background: gray;
}
h3 {
    color: white
}
.date-chat {
    font-size: 8px;
    text-align: center;
    margin-bottom: 0;
}
.chat-text {
    width: 92%;
}
.chat-item {
    margin-bottom: 1px;
    padding: 10px 10px 5px 10px;
    border-bottom: 1px solid #ddd;
    position: relative;
}
.own-chat {
    color: white;
    background-color: #30c0ff;
}
.chats {
    background: white;
    width: 100%;
    height: 70vh;
    max-height: 70vh;
    overflow-y: auto;
    border-radius: 10px;
}

.chat-container {
    font-family: "Agency FB";
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90vw;
    max-width: 770px;
    padding: 10px;
}
input {
    width: 65vw;
    max-width: 600px;
    border: none;
}
button {
    border: none;
    outline: none;
    width: 15vw;
    max-width: 150px;
    font-size: 0.9em;
    display: flex;
    justify-content: center;
    align-items: center;
}
.send-chat {
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
}
.send-chat button {
    width: 18vw;
}

.delete-chat {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 25px;
    height: 25px;
    transition: 0.3s ease;
    background: url("/icons/trash.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}
.delete-chat:hover {
    cursor: pointer;
    transform: scale(1.03);
    background: url("/icons/trashred.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}
</style>

