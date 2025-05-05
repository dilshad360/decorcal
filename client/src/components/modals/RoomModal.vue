<template>
    <div v-if="show" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h2 class="text-xl font-semibold mb-4">Add Room</h2>
            <form @submit.prevent="submitForm" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium">Name</label>
                    <input v-model="formData.name" type="text" class="w-full input input-bordered"
                        :class="{ 'border-red-500': v$.name.$error }" />
                    <p v-if="v$.name.$error" class="mt-1 text-sm text-red-600">Name is required</p>
                </div>

                <div>
                    <label class="block text-sm font-medium">Floor</label>
                    <select v-model="formData.floor"  class="select w-full">
                        <option v-for="floor in floorOptions" :value="floor.value" >{{ floor.label }}</option>
                    </select>
                </div>


                <div class="flex justify-end space-x-2 pt-4">
                    <button type="button" class="btn btn-outline" @click="closeModal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useRoomStore } from '@/stores/room'

const props = defineProps({
    show: Boolean,
    id: String,
})
const emitEvent = defineEmits(['close'])

const roomStore = useRoomStore()

const floorOptions = [
    { value: '0', label: 'Ground Floor' },
    { value: '1', label: '1st Floor' },
    { value: '2', label: '2nd Floor' },
    { value: '3', label: '3rd Floor' },
]

const formData = reactive({
    clientId: props.id,
    name: '',
    floor: '',
})



// Basic validation rules
const rules = {
    name: { required },
}

// Create Vuelidate instance
const v$ = useVuelidate(rules, formData)

const submitForm = async () => {
    // Validate all fields
    const isValid = await v$.value.$validate()
    
    if (isValid) {

        console.log('Form data:', formData)
        roomStore.addRoom(formData)

        // clientStore.addClient(formData)
        // Reset form
        formData.name = ''
        formData.floor = ''
        v$.value.$reset()
        
        emitEvent('close')
    }
}

const closeModal = () => {
    // Reset form and validation state
    formData.name = ''
    formData.floor = ''
    v$.value.$reset()

    emitEvent('close')
}
</script>

<style lang="scss" scoped></style>
