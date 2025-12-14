import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import Favorites from './components/Favorites.vue'
import Profile from './components/Profile.vue'
import MobileDrawer from './components/Drawer/MobileDrawer.vue'

export const Paths = {
  home: '/',
  favorites: '/favorites',
  profile: '/profile',
  drawer: '/drawer',
}

const routes = [
  { path: Paths.favorites, component: Favorites },
  { path: Paths.home, component: Home },
  { path: Paths.profile, component: Profile },
  { path: Paths.drawer, component: MobileDrawer },
]



export const router = createRouter({
  history: createWebHistory(),
  routes,
})