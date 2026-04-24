<template>
  <v-container class="fill-height bg-grey-lighten-4" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-4 rounded-lg">
          <v-card-title class="text-center pt-6 text-h5 text-primary font-weight-bold">
            Set New Password
          </v-card-title>
          <v-card-subtitle class="text-center pb-4">
            Enter your new password below
          </v-card-subtitle>
          <v-card-text>
            <template v-if="!done">
              <v-form @submit.prevent="handleSubmit">
                <v-text-field
                  v-model="newPassword"
                  label="New Password"
                  prepend-inner-icon="mdi-lock-outline"
                  variant="outlined"
                  type="password"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="confirmPassword"
                  label="Confirm Password"
                  prepend-inner-icon="mdi-lock-check-outline"
                  variant="outlined"
                  type="password"
                  class="mt-2"
                  required
                ></v-text-field>

                <v-alert v-if="error" type="error" density="compact" class="mt-2 text-start">
                  {{ error }}
                </v-alert>

                <v-btn color="primary" type="submit" variant="flat" block size="large" class="mt-6" :loading="loading">
                  Reset Password
                </v-btn>
              </v-form>
            </template>
            <template v-else>
              <v-alert type="success" density="compact" class="mb-4">
                Your password has been reset successfully.
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
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const newPassword = ref('')
const confirmPassword = ref('')
const error = ref('')
const loading = ref(false)
const done = ref(false)

const handleSubmit = async () => {
  if (newPassword.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.'
    return
  }
  loading.value = true
  error.value = ''
  try {
    await axios.post(`${import.meta.env.VITE_BE_API_URL}/api/password-reset/confirm/`, {
      uid: route.query.uid,
      token: route.query.token,
      new_password: newPassword.value,
    })
    done.value = true
  } catch (err) {
    error.value = err.response?.data?.non_field_errors?.[0] || 'Invalid or expired reset link.'
  } finally {
    loading.value = false
  }
}
</script>