import express, { Request, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import UserRoute from './routes/UserRoute'

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => console.log('Connected to MongoDb Database'))

const app = express()
app.use(express.json())
app.use(cors())

app.get('/health', async (req: Request, res: Response) => {
    res.send({ message: 'Health Ok!' })
})

app.use('/api/user', UserRoute)

app.listen(7000, () => {
    console.log('Server is running on port 7000')
})
