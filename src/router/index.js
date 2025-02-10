import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapView from "@/views/MapView.vue";
import DetailsView from "@/views/DetailsView.vue";
import Login from "@/views/Login.vue";
import ProfileView from "@/views/ProfileView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/map',
      name: 'map',
      component: MapView,
    },
    {
      path: '/details/:id',
      name: 'details',
      component: DetailsView,
      props: true,
    },
    {
      path: '/',
      name: 'login',
      component: Login,
    },
  ],
})

export default router
