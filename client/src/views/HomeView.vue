<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useClientStore } from '@/stores/client'
import { useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import ClientModal from '@/components/modals/ClientModal.vue'
import api from '@/services/axios'

const auth = useAuthStore()
const clientStore = useClientStore()
const router = useRouter()

const showModal = ref(false)
const clients = ref([])
const loading = ref(false)

const formData = ref({
  name: '',
  phone: '',
  location: ''
})



onMounted(() => {
  clientStore.fetchClients()
})



</script>

<template>
  <main class="min-h-screen relative">
    <Header />

    <div>
      <div v-if="clientStore.loading">Loading...</div>
      <div v-else-if="clientStore.clients.length === 0" class="text-gray-500">
        No clients found.
      </div>
      <ul v-else class="space-y-2">
        <li v-for="client in clientStore.clients" :key="client._id" class="p-4 bg-white shadow rounded">
          <p><strong>Name:</strong> {{ client.name }}</p>
          <p><strong>Phone:</strong> {{ client.phoneNumber }}</p>
          <p><strong>Location:</strong> {{ client.location }}</p>
        </li>
      </ul>
    </div>

    <!-- FAB Button -->
    <button class="btn btn-circle btn-lg absolute bottom-4 right-4  bg-primary" @click="showModal = true">
      +
    </button>

    <ClientModal :show="showModal" @close="showModal = false" />

  </main>
</template>

<style scoped>
/* Optional: You can add transitions or dark mode support */
</style>
