<template>
    <div class="px-4 pt-6 pb-4 flex justify-between items-center shadow-md mb-2 bg-white rounded-b-sm">
        <h2 class="text-2xl font-medium capitalize text-gray-500">
            Hi {{ userStore.currentUser?.name || '...' }} 👋
        </h2>

        <div className="dropdown dropdown-end">
            <div tabIndex="{0}" role="button"
                class="bg-gray-200 w-10 h-10 rounded-full flex 
                justify-center items-center cursor-pointer hover:bg-gray-300 hover:shadow-sm">
                <Icon icon="prime:user" class="text-gray-500" width="24" height="24" />
            </div>
            <ul tabIndex="{0}" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <!-- <li><a>Settings</a></li> -->
                <li>
                    <div @click="handleLogout">Logout</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

const userStore = useUserStore()
const auth = useAuthStore()
const router = useRouter()

onMounted(() => {
    userStore.fetchCurrentUser()
})

const handleLogout = async () => {
    auth.logout()
    router.push('/login')
}
</script>

<style lang="scss" scoped></style>
