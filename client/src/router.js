// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from './views/HomeView.vue'
import LoginView from './views/LoginView.vue'
import ClientView from './views/ClientView.vue'
import RoomView from './views/RoomView.vue'

const routes = [
  { path: '/', component: HomeView, meta: { requiresAuth: true } },
  { path: '/client/:id', component: ClientView, meta: { requiresAuth: true } },
  { path: '/room/:id', component:RoomView , meta: { requiresAuth: true } },
  { path: '/login', component: LoginView },
  // { path: '/:catchAll(.*)*', component: LoginView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  // Redirect authenticated users away from the login page
  if (to.path === '/login' && auth.isAuthenticated) {
    next('/')
  }
  // Redirect unauthenticated users trying to access protected routes
  else if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next('/login')
  } 
  else {
    next()
  }
})


export default router
