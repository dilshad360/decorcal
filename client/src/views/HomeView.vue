<script setup>
import { ref, onMounted } from 'vue'
import { useClientStore } from '@/stores/client'
import { useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import ClientModal from '@/components/modals/ClientModal.vue'
import ClientListCard from '@/components/ClientListCard.vue'

const clientStore = useClientStore()


const showModal = ref(false)


onMounted(() => {
  clientStore.fetchClients()
})


</script>

<template>
  <main class="h-screen flex flex-col relative">
    <Header />

  
    <div class="flex-1 overflow-y-auto px-4 py-2">
      <div class="flex justify-center" v-if="clientStore.loading"><progress className="progress w-[90%] opacity-50"></progress></div>
      <div v-else-if="clientStore.clients.length === 0" class="text-gray-500">
        No clients found.
      </div>
      <ul v-else class="space-y-2">
        <ClientListCard
          v-for="client in clientStore.clients"
          :key="client._id"
          :client="client"
        />

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
