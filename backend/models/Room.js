// models/Room.js
import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },
    name: { type: String, required: true },
    floor: String,
}, { timestamps: true })

export default mongoose.model('Room', roomSchema)
