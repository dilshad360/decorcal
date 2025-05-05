<template>
    <div class="relative min-h-screen px-4 py-2">
        Room ID : {{ route.params.id }}

        <h2 class="text-4xl font-semibold text-left mb-3">Areas</h2>


        <div class="flex-1">
            <div v-if="areaStore.loading" class="flex justify-center">
                <progress className="progress w-[90%] opacity-50"></progress>
            </div>
            <div v-else-if="areaStore.areas.length === 0">No area found.</div>
            <div v-else class="grid grid-cols-3 gap-2">
                <div @click="navigateToRoom(area._id)"
                    class="bg-blue-300 flex justify-center flex-col items-center p-2 rounded-md transition-all ease-in-out duration-150 hover:shadow-md hover:scale-105"
                    v-for="area in areaStore.areas">
                    <h3 class="text-xl font-semibold">{{ area.width }} x {{ area.length }}</h3>
                    <p>{{area.width * area.length}}</p>
                </div>
            </div>
            </div>


        <button class="btn btn-circle btn-lg absolute bottom-4 right-4 bg-primary" @click="showModal = true">
            +
        </button>
        <AreaModal :show="showModal" :id="route.params.id" @close="showModal = false" />
    </div>
</template>

<script setup>
import AreaModal from '@/components/modals/AreaModal.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { useAreaStore } from '@/stores/area';

const areaStore = useAreaStore()

onMounted(() => {
    areaStore.fetchAreas(route.params.id)
})


const route = useRoute()
const showModal = ref(false)


</script>

<style lang="scss" scoped>

</style>