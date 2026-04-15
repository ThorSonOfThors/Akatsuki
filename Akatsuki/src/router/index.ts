import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import Zabava from '../views/Zabava.vue'
import Kontakt from '../views/Kontakt.vue'
import ONama from '../views/ONama.vue'
import MestoOkupljanja from '../views/MestoOkupljanja.vue'
import HomeView from '../views/HomeView.vue'
import EventManager from '../views/EventManager.vue'
import LoginAdmin from '../views/LoginAdmin.vue'

const routes = [
  { path: '/', redirect: '/zabava' },
  { path: '/zabava', component: Zabava },
  { path: '/kontakt', component: Kontakt },
  { path: '/o-nama', component: ONama },
  { path: '/mesto-okupljanja', component: MestoOkupljanja },
  { path: '/home', component: HomeView },
  { path: '/admin', component: EventManager, meta: { requiresAuth: true } },
  { path: '/loginAdmin', component: LoginAdmin },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

/* 🔥 ROUTE GUARD */
router.beforeEach(async (to, _from, next) => {
  const auth = useAuthStore()

  try {
    // 🔥 Ensure auth state is loaded BEFORE checking
    if (auth.user === null) {
      await auth.fetchUser()
    }

    // 🔐 Block protected routes
    if (to.meta.requiresAuth && !auth.user) {
      return next('/loginAdmin')
    }

    // ✅ Allow navigation
    next()

  } catch (err) {
    console.error('Auth guard error:', err)
    next('/loginAdmin')
  }
})

export default router