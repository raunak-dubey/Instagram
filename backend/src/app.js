import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.route.js'
import postRouter from './routes/post.route.js';
import userRouter from './routes/user.route.js';
import likeRouter from './routes/like.route.js';

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use('/api/likes', likeRouter)
app.use('/api/user', userRouter)

export default app;