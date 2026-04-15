import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'
import AdminLayout from '../layouts/AdminLayout.vue'
import UserLayout from '../layouts/UserLayout.vue'
import AdminLoginView from '../views/AdminLoginView.vue'
import UserLoginView from '../views/UserLoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import UserDashboard from '../views/UserDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: { render: () => {} }, // Dummy component for guard to handle redirect
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: UserLoginView
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLoginView
  },
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
  
  // Handle root path redirect
  if (to.path === '/') {
    if (!authStore.isAuthenticated) {
      next('/login')
      return
    }
    if (!authStore.user) {
      await authStore.fetchUser()
    }
    next(authStore.user?.is_staff ? '/admin/dashboard' : '/dashboard')
    return
  }

  // Prevent logged in users from visiting login pages
  if (authStore.isAuthenticated && (to.path === '/login' || to.path === '/admin/login')) {
    if (!authStore.user) {
        await authStore.fetchUser()
    }
    next(authStore.user?.is_staff ? '/admin/dashboard' : '/dashboard')
    return
  }

  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      next(to.path.includes('/admin') || to.meta.requiresAdmin ? '/admin/login' : '/login')
      return
    }

    if (!authStore.user) {
        await authStore.fetchUser()
    }

    if (to.meta.requiresAdmin && !authStore.user?.is_staff) {
      next('/dashboard')
      return
    }
  }
  
  next()
})

export default router
