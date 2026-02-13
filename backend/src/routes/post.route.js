import Router from 'express'
import { createPostController } from '../controllers/post.controller.js';
import uploadMiddleware from '../middlewares/upload.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const postRouter = Router()

// ? ==================== POST Api [protected] ======================== //
postRouter.post('/', authMiddleware, uploadMiddleware, createPostController)

export default postRouter;