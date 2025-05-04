
import express from 'express';
import auth from '../middleware/authMiddleware.js'
import User from '../models/User.js';

const router = express.Router();


router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password') // exclude password
    if (!user) return res.status(404).send('User not found')
    res.json(user)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
})

export default router;
