<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-6">
      <h1 class="text-h4">Users Overview</h1>
      <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ props }">
          <v-btn color="primary" prepend-icon="mdi-plus" v-bind="props">
            Add User
          </v-btn>
        </template>
        <v-card class="rounded-lg pa-4">
          <v-card-title class="text-h5 pb-4">Create New User</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="saveUser">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="form.username" label="Username" required variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="form.email" label="Email" type="email" required variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="form.first_name" label="First Name" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="form.last_name" label="Last Name" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field 
                    v-model="form.password" 
                    label="Password" 
                    type="password" 
                    required 
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-switch v-model="form.is_staff" label="Admin Privileges" color="primary"></v-switch>
                </v-col>
              </v-row>
              <v-alert v-if="error" type="error" density="compact" class="mb-4">{{ error }}</v-alert>
              <v-card-actions class="px-0">
                <v-spacer></v-spacer>
                <v-btn variant="text" @click="dialog = false">Cancel</v-btn>
                <v-btn color="primary" type="submit" :loading="saving">Save User</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>

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
        <template v-slot:item.actions="{ item }">
          <v-btn
            icon="mdi-delete"
            size="small"
            variant="text"
            color="error"
            @click="confirmDelete(item)"
          ></v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../store/auth'
import Swal from 'sweetalert2'

const users = ref([])
const loading = ref(true)
const dialog = ref(false)
const saving = ref(false)
const error = ref('')
const authStore = useAuthStore()

const form = reactive({
  username: '',
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  is_staff: false
})

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Username', key: 'username' },
  { title: 'Email', key: 'email' },
  { title: 'First Name', key: 'first_name' },
  { title: 'Last Name', key: 'last_name' },
  { title: 'Role', key: 'is_staff' },
  { title: 'Actions', key: 'actions', sortable: false },
]

const fetchUsers = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${import.meta.env.VITE_BE_API_URL}/api/users/`, {
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    users.value = response.data
  } catch (err) {
    console.error("Failed to fetch users", err)
  } finally {
    loading.value = false
  }
}

const saveUser = async () => {
  saving.value = true
  error.value = ''
  try {
    await axios.post(`${import.meta.env.VITE_BE_API_URL}/api/users/`, form, {
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    dialog.value = false
    // Reset form
    Object.keys(form).forEach(key => form[key] = key === 'is_staff' ? false : '')
    await fetchUsers()
    
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'User created successfully.',
      timer: 2000,
      showConfirmButton: false
    })
  } catch (err) {
    error.value = err.response?.data?.detail || "Failed to create user."
    console.error("Error creating user", err)
  } finally {
    saving.value = false
  }
}

const confirmDelete = async (user) => {
  if (user.id === authStore.user?.id) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You cannot delete your own account!',
    })
    return
  }

  const result = await Swal.fire({
    title: 'Are you sure?',
    text: `You are about to delete user "${user.username}". This action cannot be undone!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  })

  if (result.isConfirmed) {
    try {
      await axios.delete(`${import.meta.env.VITE_BE_API_URL}/api/users/${user.id}/`, {
        headers: { Authorization: `Bearer ${authStore.token}` }
      })
      await fetchUsers()
      Swal.fire(
        'Deleted!',
        'The user has been deleted.',
        'success'
      )
    } catch (err) {
      console.error("Error deleting user", err)
      Swal.fire(
        'Error!',
        'Failed to delete the user. Please try again.',
        'error'
      )
    }
  }
}

onMounted(fetchUsers)
</script>
