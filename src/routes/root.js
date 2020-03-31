import { Router } from 'express'
import auth from '../helpers/auth'

const router = Router()

router.get('/', (req, res) => {
  res.json({ msg: process.env.APP_NAME || 'Hello There' })
})

router.get('/login', auth, (req, res) => {
  res.json(req.user)
})
export default router
