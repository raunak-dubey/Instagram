import cookieParser from 'cookie-parser';
import express from 'express';
import authRouter from './routes/auth.route.js'
import postRouter from './routes/post.route.js';
import userRouter from './routes/user.route.js';

const app = express();
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use('/api/user', userRouter)

export default app;