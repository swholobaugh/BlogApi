import { Router } from 'express'

const router = Router()

router.get('/posts', (req, res) => {
  res.json({ msg: 'Hello from Posts API' })
})

export default router
