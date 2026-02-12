import Router from 'express'
import { createPostController } from '../controllers/post.controller.js';
import uploadMiddleware from '../middlewares/upload.middleware.js';

const postRouter = Router()

// ? ==================== POST Api [protected] ======================== //
postRouter.post('/', uploadMiddleware, createPostController)

export default postRouter;