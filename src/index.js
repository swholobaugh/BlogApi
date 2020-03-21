import './helpers/dotenv'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import pino from 'express-pino-logger'

const app = express()
const port = parseInt(process.env.PORT)

app.use(cors({ origin: process.env.ORIGIN }))
app.use(helmet())
app.use(pino())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ msg: 'Hello There' })
})

app.listen(port)
