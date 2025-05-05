<template>
    <li
      class="p-4 bg-white shadow rounded flex justify-between items-start mb-2 cursor-pointer"
      @click="navigateToClient(client._id)"
    >
      <!-- Client Info -->
      <div>
        <p><strong>Name:</strong> {{ client.name }}</p>
        <p><strong>Phone:</strong> {{ client.phoneNumber }}</p>
        <p><strong>Location:</strong> {{ client.location }}</p>
      </div>
  
      <!-- Dropdown Menu -->
      <div class="dropdown dropdown-end" @click.stop>
        <button tabindex="0" class="btn btn-ghost btn-circle btn-sm">
          <Icon icon="mage:dots" class="text-gray-500" width="24" height="24" />
        </button>
        <ul
          tabindex="0"
          class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
        >
          <li><a @click.prevent="editClient(client)">Edit</a></li>
          <li><a @click.prevent="clientStore.deleteClient(client._id)">Delete</a></li>
        </ul>
      </div>
    </li>
  </template>

<script setup>
import { Icon } from '@iconify/vue'
import { useClientStore } from '@/stores/client'
import { useRouter } from 'vue-router'
const router = useRouter()


const clientStore = useClientStore()

const props = defineProps({
    client: Object,
})

const navigateToClient = (id) => {
  router.push(`/client/${id}`)
}

</script>

<style lang="scss" scoped></style>