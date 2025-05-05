<template>
    <div class="relative min-h-screen">
        Client ID : {{ route.params.id }}
        <button class="btn btn-circle btn-lg absolute bottom-4 right-4 bg-primary" @click="showModal = true">
            +
        </button>
    <RoomModal :show="showModal" :id="route.params.id" @close="showModal = false" />

        
    </div>

</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import RoomModal from '../components/modals/RoomModal.vue';

const route = useRoute()
const showModal = ref(false)

</script>

<style lang="scss" scoped></style>