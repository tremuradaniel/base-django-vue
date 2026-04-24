<template>
  <v-container class="fill-height bg-grey-lighten-4" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-4 rounded-lg">
          <v-card-title class="text-center pt-6 text-h5 text-primary font-weight-bold">
            Reset Password
          </v-card-title>
          <v-card-subtitle class="text-center pb-4">
            Enter your email and we'll send you a reset link
          </v-card-subtitle>
          <v-card-text>
            <template v-if="!submitted">
              <v-form @submit.prevent="handleSubmit">
                <v-text-field
                  v-model="email"
                  label="Email"
                  prepend-inner-icon="mdi-email-outline"
                  variant="outlined"
                  type="email"
                  required
                ></v-text-field>

                <v-alert v-if="error" type="error" density="compact" class="mt-2 text-start">
                  {{ error }}
                </v-alert>

                <v-btn color="primary" type="submit" variant="flat" block size="large" class="mt-6" :loading="loading">
                  Send Reset Link
                </v-btn>
              </v-form>
            </template>
            <template v-else>
              <v-alert type="success" density="compact" class="mb-4">
                If that email is registered, a reset link has been sent.
              </v-alert>
            </template>

            <div class="text-center mt-4">
              <router-link :to="{ name: 'UserLogin' }" class="text-primary text-decoration-none text-body-2">
                Back to Sign In
              </router-link>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const error = ref('')
const loading = ref(false)
const submitted = ref(false)

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  try {
    await axios.post(`${import.meta.env.VITE_BE_API_URL}/api/password-reset/`, { email: email.value })
    submitted.value = true
  } catch {
    error.value = 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>