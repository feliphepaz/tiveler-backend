import express from 'express'
import routes from './routes'
import cors from 'cors'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const app = express()
const port = process.env.PORT || 5000

mongoose.connect(`${process.env.DATABASE}`)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(routes)

app.listen(port, () => {
  console.log(`[SERVER] Listening on port ${port}`)
})
