<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import Header from '@/components/Header.vue'

const auth = useAuthStore()
const router = useRouter()

</script>

<template>
  <main className=" min-h-screen bg-amber-50">
    <Header />

  </main>
</template>

<style scoped></style>
