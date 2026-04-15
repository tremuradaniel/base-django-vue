import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'
import AdminLayout from '../layouts/AdminLayout.vue'
import UserLayout from '../layouts/UserLayout.vue'
import DashboardView from '../views/DashboardView.vue'
import UserDashboard from '../views/UserDashboard.vue'
import authRoutes from './auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: { render: () => {} },
    meta: { requiresAuth: true }
  },
  ...authRoutes,
  {
    path: '/dashboard',
    component: UserLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'UserDashboard',
        component: UserDashboard
      }
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: DashboardView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.path === '/') {
    if (!authStore.isAuthenticated) {
      next({ name: 'UserLogin' })
      return
    }
    if (!authStore.user) {
      await authStore.fetchUser()
    }
    next({ name: authStore.user?.is_staff ? 'AdminDashboard' : 'UserDashboard' })
    return
  }

  if (authStore.isAuthenticated && (to.name === 'UserLogin' || to.name === 'AdminLogin')) {
    if (!authStore.user) {
        await authStore.fetchUser()
    }
    next({ name: authStore.user?.is_staff ? 'AdminDashboard' : 'UserDashboard' })
    return
  }

  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      const isAdminPath = to.path.includes('/admin') || to.meta.requiresAdmin
      next({ name: isAdminPath ? 'AdminLogin' : 'UserLogin' })
      return
    }

    if (!authStore.user) {
        await authStore.fetchUser()
    }

    if (to.meta.requiresAdmin && !authStore.user?.is_staff) {
      next({ name: 'UserDashboard' })
      return
    }
  }
  
  next()
})

export default router
