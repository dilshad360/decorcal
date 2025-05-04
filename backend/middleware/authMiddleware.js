
import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]

  if (!token) return res.status(401).send('No token, authorization denied')

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // { id: user._id }
    next()
  } catch (err) {
    res.status(401).send('Token is not valid')
  }
}

export default auth
