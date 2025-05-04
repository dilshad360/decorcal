// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'
import LoginView from './views/LoginView.vue'

const routes = [
  { path: '/', component: HomeView, meta: { requiresAuth: true } },
  { path: '/about', component: AboutView, meta: { requiresAuth: true } },
  { path: '/login', component: LoginView },
  // { path: '/:catchAll(.*)*', component: LoginView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 🛡️ Navigation Guard
import { useAuthStore } from '@/stores/auth'

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
