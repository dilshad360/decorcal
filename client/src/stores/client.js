// src/stores/client.js
import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'
import api from '../services/axios'

export const useClientStore = defineStore('client', {
    state: () => ({
        clients: [],
        loading: false,
    }),

    actions: {
        async fetchClients() {
            this.loading = true
            try {
                const res = await api.get('clients')
                this.clients = res.data
            } catch (error) {
                console.error('Error fetching clients:', error)
            } finally {
                this.loading = false
            }
        },

        async addClient(newClient) {
            try {
                await api.post('clients', newClient)
                await this.fetchClients() // Refresh list
            } catch (error) {
                console.error('Error adding client:', error)
            }
        },
    },
})
