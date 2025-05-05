// src/stores/client.js
import { defineStore } from 'pinia'
import api from '../services/axios'

export const useRoomStore = defineStore('room', {
    state: () => ({
        rooms: [],
        loading: false,
    }),

    actions: {

        async addRoom(newRoom) {
            try {
                await api.post('rooms', newRoom)
                // await this.fetchRooms()
            }
            catch (error) {
                console.error('Error adding room:', error)
            }
        },
        
        async fetchRooms() {
            this.loading = true
            try {
                const res = await api.get('rooms')
                this.rooms = res.data
            } catch (error) {
                console.error('Error fetching rooms:', error)
            } finally {
                this.loading = false
            }
        },


        
    }
})