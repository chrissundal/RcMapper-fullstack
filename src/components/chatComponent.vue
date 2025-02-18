<template>
    <div class="chat-container">
        <h3>{{categoryName}} chatrom</h3>
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
        <div v-if="chats.length" class="chats">
            <div v-for="chat in chats" :key="chat.id" :class="['chat-item', { 'own-chat': chat.username === store.state.user.username }]" >
                <p><strong style="font-size: large; color: black">{{ chat.username }}:</strong> {{ chat.message }}</p>
                <p class="date-chat">{{new Date(chat.createdAt).toLocaleString()}}</p>
                <div v-if="chat.username === store.state.user.username || store.state.user.admin">
                    <div class="delete-chat" @click="deleteChatpost(chat.chatId)"></div>
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
    gap: 10px;
    margin-bottom: 20px;

}
h3 {
    color: white
}
.filter-buttons button.active {
    background-color: #30c0ff;
    color: white;
}
.filter-buttons button.active:hover {
    transform: scale(1);
    cursor: default;
}
.chat-item {
    margin-bottom: 1px;
    padding: 10px;
    border-bottom: 1px solid #ddd;
}
.own-chat {
    margin-bottom: 1px;
    padding: 10px;
    color: white;
    border-bottom: 1px solid #ddd;
    background-color: #30c0ff;
}
.chats {
    background: white;
    width: 85vw;
    max-width: 700px;
    height: 55vh;
    max-height: 60vh;
    overflow-y: auto;
    border-radius: 10px;
}

.chat-container {
    font-family: "Agency FB";
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}
input {
    margin-bottom: 10px;
    margin-top: 10px;
    width: 60vw;
    border: none;
}
button {
    border: none;
    outline: none;
    width: 13vw;
    max-width: 150px;
    font-size: 0.9em;
    display: flex;
    justify-content: center;
    align-items: center;
}
.send-chat {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
}
.send-chat button {
    width: 10vw;
}

.delete-chat {
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
.date-chat {
    font-size: 12px;
    font-style: italic;
}
</style>

