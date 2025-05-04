import express from 'express'
import Room from '../models/Room.js'
import auth from '../middleware/authMiddleware.js'

const router = express.Router()

// Create Room
router.post('/', auth, async (req, res) => {
    const { clientId, name, floor } = req.body
    try {
        const room = new Room({
            userId: req.user.id,
            clientId,
            name,
            floor
        })
        await room.save()
        res.status(201).json(room)
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
})

// Get all rooms for a client
router.get('/client/:clientId', auth, async (req, res) => {
    try {
        const rooms = await Room.find({
            clientId: req.params.clientId,
            userId: req.user.id,
        }).sort({ createdAt: -1 })
        res.json(rooms)
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
})

// Update Room
router.put('/:id', auth, async (req, res) => {
    const { name, type, notes } = req.body
    try {
        const updated = await Room.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { name, floor },
            { new: true }
        )
        if (!updated) return res.status(404).send('Room not found or unauthorized')
        res.json(updated)
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
})

// Delete Room
router.delete('/:id', auth, async (req, res) => {
    try {
        const deleted = await Room.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id,
        })
        if (!deleted) return res.status(404).send('Room not found or unauthorized')
        res.json({ message: 'Room deleted' })
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
})

export default router
