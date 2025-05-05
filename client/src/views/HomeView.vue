<script setup>
import { ref, onMounted, computed } from 'vue'
import { useClientStore } from '@/stores/client'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import Header from '@/components/Header.vue'
import ClientModal from '@/components/modals/ClientModal.vue'
import ClientListCard from '@/components/ClientListCard.vue'

const clientStore = useClientStore()

const showModal = ref(false)
const searchQuery = ref('')

onMounted(() => {
  clientStore.fetchClients()
})

const filteredClients = computed(() => {
  return clientStore.clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})
</script>

<template>
  <main class="h-screen flex flex-col relative">
    <Header />

    <div class="flex-1 overflow-y-auto px-4 py-2">
      <label className=" input input-bordered w-full mb-2">
        <Icon icon="jam:search" class="text-gray-500" width="20" height="20" />
        
      <input v-model="searchQuery"  type="search" required
        placeholder="Search" />
      </label>

      <div class="flex justify-center" v-if="clientStore.loading">
        <progress className="progress w-[90%] opacity-50"></progress>
      </div>
      <div v-else-if="filteredClients.length === 0" class="text-gray-500">No clients found.</div>
      <ul v-else class="space-y-2">
        <ClientListCard v-for="client in filteredClients" :key="client._id" :client="client" />
      </ul>
    </div>

    <!-- FAB Button -->
    <button class="btn btn-circle btn-lg absolute bottom-4 right-4 bg-primary" @click="showModal = true">
      +
    </button>

    <ClientModal :show="showModal" @close="showModal = false" />
  </main>
</template>

<style scoped>
/* Optional: You can add transitions or dark mode support */
</style>
