<template>
  <div class="flex flex-col gap-4 justify-center items-center h-screen w-full">
    <img src="/login-image.jpg" alt="Logo" class="w-[90%] mb-4" />
    <div class="flex flex-col gap-2 w-[90%]">
      <h2 class="text-4xl font-semibold text-left">Login</h2>
      <p class="text-left">Welcome back! Please enter your details.</p>
    </div>
    <form @submit.prevent="handleLogin" class="flex flex-col gap-3 w-[90%]">
      <input
        v-model="mobile"
        type="text"
        placeholder="Mobile Number"
        required
        class="input w-full p-2 border rounded-md input-lg"
      />
      <input
        v-model="password"
        type="password"
        required
        placeholder="Password"
        class="input w-full p-2 border rounded-md input-lg"
      />
      <button type="submit" class="btn btn-primary mt-4 btn-lg">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import api from '@/services/axios'

const mobile = ref('')
const password = ref('')
const router = useRouter()
const auth = useAuthStore()

const handleLogin = async () => {
  try {
    const response = await api.post('/auth/login', {
      mobile: mobile.value,
      password: password.value,
    })
    auth.login(response.data.token)
    router.push('/')
  } catch (error) {
    console.error('Login failed:', error)
    alert(`Invalid Mobile Number or password`)
  }
}

</script>

<style scoped></style>
