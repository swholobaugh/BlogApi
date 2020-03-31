import { Router } from 'express'
import * as postServices from '../../services/posts'
import auth from '../../helpers/auth'

const router = Router()

router.get('/posts', async (req, res) => res.send(await postServices.getAll()))

router.get('/posts/:id', async (req, res) => {
  const post = await postServices.getById(req.params.id)
  post ? res.send(post) : res.status(404).end()
})

router.post('/posts', auth, async (req, res) => {
  req.body.post ? res.send(await postServices.add(req.body.post)) : res.status(400).send({ msg: '💩 Bad Request' })
})

router.put('/posts/:id', auth, async (req, res) => {
  const post = await postServices.getById(req.params.id)
  req.body.post && post
    ? post.author.id == req.user.id
      ? res.send(await postServices.update(req.body.post, req.params.id))
      : res.status(401).end()
    : res.status(400).send({ msg: '💩 Bad Request' })
})

router.delete('/posts/:id', auth, async (req, res) => {
  const post = await postServices.getById(req.params.id)
  post
    ? post.author.id == req.user.id
      ? res.send(await postServices.remove(req.params.id))
      : res.status(401).end()
    : res.status(404).end()
})

export default router
