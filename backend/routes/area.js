// routes/area.js
import express from 'express'
import Area from '../models/Area.js'
import auth from '../middleware/authMiddleware.js'

const router = express.Router()

// ✅ Create Area
router.post('/', auth, async (req, res) => {
  const { roomId, name, width, length, notes } = req.body

  try {
    const area = new Area({
      userId: req.user.id,
      roomId,
      name,
      width,
      length,
    })
    await area.save()
    res.status(201).json(area)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
})

// ✅ Get all Areas for a Room
router.get('/room/:roomId', auth, async (req, res) => {
  try {
    const areas = await Area.find({
      roomId: req.params.roomId,
      userId: req.user.id,
    }).sort({ createdAt: -1 })
    res.json(areas)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
})

// ✅ Update Area
router.put('/:id', auth, async (req, res) => {
  const { name, width, length, notes } = req.body

  try {
    const updated = await Area.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { name, width, length },
      { new: true }
    )
    if (!updated) return res.status(404).send('Area not found or unauthorized')
    res.json(updated)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
})

// ✅ Delete Area
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Area.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    })
    if (!deleted) return res.status(404).send('Area not found or unauthorized')
    res.json({ message: 'Area deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
})

export default router
