<template>
    <div class="relative min-h-screen px-4 py-2">
        Client ID : {{ route.params.id }}

        <h2 class="text-4xl font-semibold text-left mb-3">Rooms</h2>

        <div class="flex-1">
            <div v-if="roomStore.loading" class="flex justify-center">
                <progress className="progress w-[90%] opacity-50"></progress>
            </div>
            <div v-else-if="roomStore.rooms.length === 0">No rooms found.</div>
            <div v-else class="grid grid-cols-2 gap-2">
                <div @click="navigateToRoom(room._id)"
                    class="bg-orange-300 p-2 rounded-md transition-all ease-in-out duration-150 hover:shadow-md hover:scale-105"
                    v-for="room in roomStore.rooms">
                    <h3 class="text-xl font-semibold">{{ room.name }}</h3>
                    <div :class="['flex items-center mt-1', room.floor ? 'justify-between' : 'justify-end']">
                        <div v-if="room.floor" class="badge badge-soft badge-sm badge-accent opacity-70">
                            Floor: {{ room.floor }}
                        </div>
                        <div class="dropdown dropdown-end" @click.stop>
                            <button tabindex="0" class="btn btn-ghost btn-circle btn-sm">
                                <Icon icon="mage:dots" class="text-white" width="20" height="20" />
                            </button>
                            <ul tabindex="0"
                                class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                                <!-- <li><a @click.prevent="editClient(client)">Edit</a></li> -->
                                <li>
                                    <a @click.prevent="roomStore.deleteRoom(room._id, route.params.id)">Delete</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <button class="btn btn-circle btn-lg absolute bottom-4 right-4 bg-primary" @click="showModal = true">
            +
        </button>
        <RoomModal :show="showModal" :id="route.params.id" @close="showModal = false" />
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import RoomModal from '../components/modals/RoomModal.vue'
import { useRoomStore } from '@/stores/room'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'

const route = useRoute()
const showModal = ref(false)
const roomStore = useRoomStore()
const router = useRouter()

onMounted(() => {
    roomStore.fetchRooms(route.params.id)
})

const navigateToRoom = (id) => {
    router.push(`/room/${id}`)
}
</script>

<style lang="scss" scoped></style>
