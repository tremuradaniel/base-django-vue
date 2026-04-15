import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(username, password) {
      try {
        const response = await axios.post(`${import.meta.env.BE_API_URL}/api/token/`, {
          username,
          password
        });
        this.token = response.data.access;
        localStorage.setItem('token', this.token);
        await this.fetchUser();
      } catch (error) {
        console.error('Login failed', error);
        throw error;
      }
    },
    async fetchUser() {
      if (!this.token) return;
      try {
        const response = await axios.get(`${import.meta.env.BE_API_URL}/api/users/me/`, {
          headers: { Authorization: `Bearer ${this.token}` }
        });
        this.user = response.data;
      } catch (error) {
        this.logout();
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      router.push('/login');
    }
  }
})
