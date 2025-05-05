<script setup>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useClientStore } from '@/stores/client'


const props = defineProps({
    show: Boolean,
})

const emitEvent = defineEmits(['close'])
const clientStore = useClientStore()

// Form data
const formData = reactive({
    name: '',
    phoneNumber: '',
    location: '',
})

// Basic validation rules
const rules = {
    name: { required },
    phoneNumber: { required },
    location: { required }
}

// Create Vuelidate instance
const v$ = useVuelidate(rules, formData)

const submitForm = async () => {
    // Validate all fields
    const isValid = await v$.value.$validate()
    
    if (isValid) {
        clientStore.addClient(formData)
        // Reset form
        formData.name = ''
        formData.phoneNumber = ''
        formData.location = ''
        v$.value.$reset()
        
        emitEvent('close')
    }
}

const closeModal = () => {
    // Reset form and validation state
    formData.name = ''
    formData.phoneNumber = ''
    formData.location = ''
    v$.value.$reset()
    
    emitEvent('close')
}
</script>

<template>
    <div v-if="show" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h2 class="text-xl font-semibold mb-4">Add Client</h2>
            <form @submit.prevent="submitForm" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium">Name</label>
                    <input 
                        v-model="formData.name" 
                        type="text" 
                        class="w-full input input-bordered" 
                        :class="{'border-red-500': v$.name.$error}"
                    />
                    <p v-if="v$.name.$error" class="mt-1 text-sm text-red-600">Name is required</p>
                </div>

                <div>
                    <label class="block text-sm font-medium">Phone</label>
                    <input 
                        v-model="formData.phoneNumber" 
                        type="tel" 
                        class="w-full input input-bordered" 
                        :class="{'border-red-500': v$.phoneNumber.$error}"
                    />
                    <p v-if="v$.phoneNumber.$error" class="mt-1 text-sm text-red-600">Phone is required</p>
                </div>

                <div>
                    <label class="block text-sm font-medium">Location</label>
                    <input 
                        v-model="formData.location" 
                        type="text" 
                        class="w-full input input-bordered" 
                        :class="{'border-red-500': v$.location.$error}"
                    />
                    <p v-if="v$.location.$error" class="mt-1 text-sm text-red-600">Location is required</p>
                </div>

                <div class="flex justify-end space-x-2 pt-4">
                    <button type="button" class="btn btn-outline" @click="closeModal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>