// models/Area.js
import mongoose from 'mongoose'

const areaSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    name: { type: String },
    width: { type: Number, required: true },
    length: { type: Number, required: true },
}, { timestamps: true })

export default mongoose.model('Area', areaSchema)
