import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from "axios";

const app = createApp(App);

if (store.state.token && !store.state.user) {
    axios.get('https://localhost:3000/api/token', { headers: { Authorization: `Bearer ${store.state.token}` } })
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

