import express from 'express'
import authRouter from './routes/auth.route.js'
import cors from 'cors';
import postRouter from './routes/post.route.js';
import CookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(CookieParser())

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)

export default app