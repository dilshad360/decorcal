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
                await this.fetchRooms(newRoom.clientId) 
            }
            catch (error) {
                console.error('Error adding room:', error)
            }
        },

        async fetchRooms(clientId) {
            this.loading = true
            try {
                const res = await api.get('rooms/client/' + clientId)
                this.rooms = res.data
            } catch (error) {
                console.error('Error fetching rooms:', error)
            } finally {
                this.loading = false
            }
        },

        async deleteRoom(roomId, clientId) {
            try {
                await api.delete(`rooms/${roomId}`)
                await this.fetchRooms(clientId) 
            } catch (error) {
                console.error('Error deleting room:', error)
            } 
        },


        
    }
})