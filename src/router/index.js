import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapView from "@/views/MapView.vue";
import AboutView from "@/views/AboutView.vue";
import DetailsView from "@/views/DetailsView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
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
  ],
})

export default router
