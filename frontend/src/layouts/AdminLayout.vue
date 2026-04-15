<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer" color="grey-darken-4" theme="dark">
      <v-list>
        <v-list-item
          :prepend-avatar="authStore.user ? 'https://ui-avatars.com/api/?name=' + authStore.user.username : ''"
          :title="authStore.user?.username || 'Admin User'"
          :subtitle="authStore.user?.email || 'admin@example.com'"
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" :to="{ name: 'Home' }" value="dashboard"></v-list-item>
        <v-list-item prepend-icon="mdi-account-group" title="Users" value="users"></v-list-item>
        <v-list-item prepend-icon="mdi-cog" title="Settings" value="settings"></v-list-item>
        <v-list-item prepend-icon="mdi-logout" title="Logout" @click="handleLogout" value="logout" class="mt-auto" color="error"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="primary" theme="dark">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Vue Django Admin</v-app-bar-title>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <v-container fluid class="pa-6">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../store/auth'

const drawer = ref(true)
const authStore = useAuthStore()

onMounted(() => {
  if (!authStore.user && authStore.token) {
    authStore.fetchUser()
  }
})

const handleLogout = () => {
  authStore.logout()
}
</script>
