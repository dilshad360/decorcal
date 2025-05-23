// src/stores/client.js
import { defineStore } from 'pinia'
import api from '../services/axios'

export const useAreaStore = defineStore('area', {
    state: () => ({
        areas: [],
        loading: false,
    }),

    actions: {

        async addArea(newArea) {
            try {
                await api.post('areas', newArea)
                await this.fetchAreas(newArea.roomId) 
            }
            catch (error) {
                console.error('Error adding room:', error)
            }
        },

        async fetchAreas(roomId) {
            this.loading = true
            try {
                const res = await api.get('/areas/room/' + roomId)
                this.areas = res.data
            } catch (error) {
                console.error('Error fetching areas:', error)
            } finally {
                this.loading = false
            }
        },

        // async deleteRoom(roomId, clientId) {
        //     try {
        //         await api.delete(`rooms/${roomId}`)
        //         await this.fetchRooms(clientId) 
        //     } catch (error) {
        //         console.error('Error deleting room:', error)
        //     } 
        // },

    }
})