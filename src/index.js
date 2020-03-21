import './helpers/dotenv'

import express from 'express'

const app = express()
const port = parseInt(process.env.PORT)

app.get('/', (req, res) => {
  res.json({ msg: 'Hello There' })
})

app.listen(port)
