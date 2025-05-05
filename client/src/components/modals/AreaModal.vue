<template>
    <div v-if="show" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h2 class="text-xl font-semibold mb-4">Add Area</h2>
            <form @submit.prevent="submitForm" class="space-y-4">



                <div class="flex justify-between space-x-2">

                <div>
                    <label class="block text-sm font-medium">Width</label>
                    <input v-model="formData.width" type="number" class="w-full input input-bordered"
                        :class="{ 'border-red-500': v$.width.$error }" />
                    <p v-if="v$.width.$error" class="mt-1 text-sm text-red-600">Width is required</p>
                </div>
                <div>
                    <label class="block text-sm font-medium">Length</label>
                    <input v-model="formData.length" type="number" class="w-full input input-bordered"
                        :class="{ 'border-red-500': v$.length.$error }" />
                    <p v-if="v$.length.$error" class="mt-1 text-sm text-red-600">Length is required</p>
                </div>
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
import { useAreaStore } from '@/stores/area'


const props = defineProps({
    show: Boolean,
    id: String,
})
const emitEvent = defineEmits(['close'])

const areaStore = useAreaStore()


const formData = reactive({
    roomId: props.id,
    width: '',
    length: '',
})



// Basic validation rules
const rules = {
    width: { required },
    length: { required },
}

// Create Vuelidate instance
const v$ = useVuelidate(rules, formData)

const submitForm = async () => {
    // Validate all fields
    const isValid = await v$.value.$validate()
    
    if (isValid) {

        console.log('Form data:', formData)
        areaStore.addArea(formData)

        v$.value.$reset()
        
        emitEvent('close')
    }
}

const closeModal = () => {
    // Reset form and validation state
    v$.value.$reset()

    emitEvent('close')
}
</script>

<style lang="scss" scoped></style>
