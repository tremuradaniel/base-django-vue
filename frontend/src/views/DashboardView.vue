<template>
  <div>
    <h1 class="text-h4 mb-6">Users Overview</h1>
    <v-card class="rounded-lg elevation-2 border">
      <v-data-table
        :headers="headers"
        :items="users"
        :loading="loading"
        class="elevation-0"
      >
        <template v-slot:item.is_staff="{ item }">
          <v-chip
            :color="item.is_staff ? 'success' : 'default'"
            :variant="item.is_staff ? 'flat' : 'outlined'"
            size="small"
          >
            {{ item.is_staff ? 'Admin' : 'User' }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../store/auth'

const users = ref([])
const loading = ref(true)
const authStore = useAuthStore()

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Username', key: 'username' },
  { title: 'Email', key: 'email' },
  { title: 'First Name', key: 'first_name' },
  { title: 'Last Name', key: 'last_name' },
  { title: 'Role', key: 'is_staff' },
]

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/users/', {
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    users.value = response.data
  } catch (error) {
    console.error("Failed to fetch users", error)
  } finally {
    loading.value = false
  }
})
</script>
