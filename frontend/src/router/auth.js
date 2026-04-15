import AdminLoginView from '../views/AdminLoginView.vue'
import UserLoginView from '../views/UserLoginView.vue'

export default [
  {
    path: '/login',
    name: 'UserLogin',
    component: UserLoginView
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLoginView
  }
]
