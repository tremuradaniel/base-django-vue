<template>
  <div>
    <v-card class="rounded-lg elevation-2 pa-8 text-center" color="primary" theme="dark">
      <v-icon size="64" class="mb-4">mdi-rocket-launch</v-icon>
      <h1 class="text-h3 font-weight-bold mb-2">Welcome to Your Dashboard!</h1>
      <p class="text-h6 opacity-80">You are successfully authenticated as {{ authStore.user?.username || 'a User' }}.</p>
    </v-card>
    
    <v-row class="mt-6">
      <v-col cols="12" md="4" v-for="i in 3" :key="i">
        <v-card class="elevation-1 border rounded-lg h-100">
          <v-card-text>
            <v-icon size="32" color="primary" class="mb-2">mdi-star-face</v-icon>
            <h3 class="text-h6 font-weight-bold mb-2">Feature {{ i }}</h3>
            <p class="text-body-2 text-medium-emphasis">This is a placeholder for future personalized standard-user functionality.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../store/auth'

const authStore = useAuthStore()

onMounted(() => {
  if (!authStore.user) {
    authStore.fetchUser()
  }
})
</script>
