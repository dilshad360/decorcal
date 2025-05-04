import { defineStore } from 'pinia'
import api from '@/services/axios'

export const useUserStore = defineStore('user', {
    state: () => ({
        currentUser: null,
        loading: false,
        error: null,
    }),
    actions: {
        async fetchCurrentUser() {
            this.loading = true
            this.error = null
            try {
                const response = await api.get('/c/me')
                this.currentUser = response.data
            } catch (err) {
                this.error = err
                console.error('Failed to fetch user:', err)
            } finally {
                this.loading = false
            }
        },
    },
})
