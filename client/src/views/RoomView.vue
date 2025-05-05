<template>
    <div class="relative min-h-screen px-4 py-2">
        Room ID : {{ route.params.id }}

        <h2 class="text-4xl font-semibold text-left mb-3">Areas</h2>
        <button class="btn btn-circle btn-lg absolute bottom-4 right-4 bg-primary" @click="showModal = true">
            +
        </button>
        <AreaModal :show="showModal" :id="route.params.id" @close="showModal = false" />
    </div>
</template>

<script setup>
import AreaModal from '@/components/modals/AreaModal.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()
const showModal = ref(false)


</script>

<style lang="scss" scoped>

</style>