import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

const app = createApp(App);

if (store.state.sessionId && !store.state.user) {
    axios.get('https://localhost:3000/api/user', { headers: { Authorization: `Bearer ${store.state.sessionId}` } })
        .then(response => {
            store.commit('setUser', response.data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            store.dispatch('logout');
        });
}

app.use(router);
app.use(store);
app.mount('#app');
