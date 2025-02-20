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
        redirect: '/chat',
    },
    {
        path: '/chat',
        name: 'chat',
        component: HomeView,
        meta: {
            requiresAuth: true,
            title: 'Chat',
        },
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfileView,
        meta: {
            requiresAuth: true,
            title: 'Profil',
        },
    },
    {
        path: '/map',
        name: 'map',
        component: MapView,
        meta: {
            requiresAuth: true,
            title: 'Kart',
        },
    },
    {
        path: '/details/:place',
        name: 'details',
        component: DetailsView,
        props: true,
        meta: {
            requiresAuth: true,
            title: 'Details',
        },
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: 'Login',
        },
    }
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
    document.title = `${to.params.place ? to.params.place : to.meta.title} | RcMapper`;
});

export default router;
