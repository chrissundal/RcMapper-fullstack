import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MapView from "@/views/MapView.vue";
import DetailsView from "@/views/DetailsView.vue";
import Login from "@/views/Login.vue";
import ProfileView from "@/views/ProfileView.vue";
import store from '@/store';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: { requiresAuth: true },
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfileView,
        meta: { requiresAuth: true },
    },
    {
        path: '/map',
        name: 'map',
        component: MapView,
        meta: { requiresAuth: true },
    },
    {
        path: '/details/:id',
        name: 'details',
        component: DetailsView,
        props: true,
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.state.user) {
            next({ name: 'login' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
