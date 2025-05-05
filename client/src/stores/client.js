// src/stores/client.js
import { defineStore } from 'pinia'
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
                await this.fetchClients() 
            } catch (error) {
                console.error('Error adding client:', error)
            }
        },

        async deleteClient(clientId) {
            try {
                await api.delete(`clients/${clientId}`)
                await this.fetchClients() 
            } catch (error) {
                console.error('Error deleting client:', error)
            }
        }

    },
})
