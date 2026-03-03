import express from 'express'
import cors from 'cors';
import CookieParser from 'cookie-parser'
import authRouter from './routes/auth.route.js'
import postRouter from './routes/post.route.js';
import userRouter from './routes/user.routes.js';

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
app.use('/api/user', userRouter)

export default app