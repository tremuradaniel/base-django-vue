<template>
  <v-container class="fill-height bg-grey-darken-4" fluid theme="dark">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12 rounded-xl bg-grey-darken-3 border">
          <v-toolbar color="transparent" class="text-center pt-2">
            <v-toolbar-title class="font-weight-black text-white">System Admin Access</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="pt-6">
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="username"
                label="Administrator ID"
                prepend-inner-icon="mdi-shield-account"
                variant="solo"
                type="text"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Security Key"
                prepend-inner-icon="mdi-shield-key"
                variant="solo"
                type="password"
                required
              ></v-text-field>
              
              <v-alert v-if="error" type="error" density="compact" class="mt-3">
                {{ error }}
              </v-alert>

              <v-card-actions class="mt-4 px-0">
                <v-btn color="error" type="submit" variant="flat" block size="x-large" :loading="loading">
                  Authenticate
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  try {
    await authStore.login(username.value, password.value)
    if (authStore.user?.is_staff) {
        router.push('/admin/dashboard')
    } else {
        authStore.logout()
        error.value = 'Access Denied: Administrator privileges required.'
    }
  } catch (err) {
    error.value = 'Invalid credentials'
  } finally {
    loading.value = false
  }
}
</script>
