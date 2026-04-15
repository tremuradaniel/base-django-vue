<template>
  <v-container class="fill-height bg-grey-lighten-4" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-4 rounded-lg">
          <v-card-title class="text-center pt-6 text-h5 text-primary font-weight-bold">
            Welcome Back
          </v-card-title>
          <v-card-subtitle class="text-center pb-4">
            Sign in to continue to your dashboard
          </v-card-subtitle>
          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="username"
                label="Username"
                prepend-inner-icon="mdi-account-outline"
                variant="outlined"
                type="text"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                type="password"
                class="mt-2"
                required
              ></v-text-field>
              
              <v-alert v-if="error" type="error" density="compact" class="mt-2 text-start">
                {{ error }}
              </v-alert>

              <v-btn color="primary" type="submit" variant="flat" block size="large" class="mt-6" :loading="loading">
                Sign In
              </v-btn>
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
        router.push('/dashboard')
    }
  } catch (err) {
    error.value = 'Invalid username or password'
  } finally {
    loading.value = false
  }
}
</script>
