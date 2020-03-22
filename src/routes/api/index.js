import { Router } from 'express'

import postsRoutes from './posts'

const router = Router()

router.get('/api', (req, res) => {
  res.json({ msg: 'Hello from API' })
})

router.use('/api', postsRoutes)

export default router
