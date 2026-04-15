<template>
  <v-layout>
    <v-app-bar color="white" elevation="1">
      <v-container class="d-flex align-center px-0">
        <v-app-bar-title class="font-weight-bold text-primary">
          <v-icon class="mr-2">mdi-spa</v-icon> My App
        </v-app-bar-title>
        
        <v-spacer></v-spacer>

        <v-btn to="/dashboard" variant="text" class="mr-2">Home</v-btn>
        <v-btn variant="text" class="mr-4">Profile</v-btn>

        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-avatar color="primary" size="36">
                <span class="text-white text-subtitle-2">{{ initial }}</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="handleLogout" prepend-icon="mdi-logout" title="Sign out"></v-list-item>
          </v-list>
        </v-menu>
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <v-container class="pa-6" style="max-width: 1200px;">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAuthStore } from '../store/auth'

const authStore = useAuthStore()

const initial = computed(() => {
    return authStore.user?.username?.charAt(0).toUpperCase() || 'U'
})

onMounted(() => {
  if (!authStore.user && authStore.token) {
    authStore.fetchUser()
  }
})

const handleLogout = () => {
  authStore.logout()
}
</script>
