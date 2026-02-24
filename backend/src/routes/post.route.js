import Router from 'express'
import { createPostController, getPostController, getPostDetailsController, getAllFeedController } from '../controllers/post.controller.js';
import uploadMiddleware from '../middlewares/upload.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const postRouter = Router()

// ? ==================== Create POST Api [protected] ======================== //
postRouter.post('/', authMiddleware, uploadMiddleware, createPostController)

// ? =================== Get Post Api [protected] ==================== //
postRouter.get('/', authMiddleware, getPostController)

// ? =================== Get Post Details Api [protected] ==================== //
postRouter.get('/details/:postId', authMiddleware, getPostDetailsController)

// ? =================== Get All Feed Api [protected] ==================== //
postRouter.get('/feed', authMiddleware, getAllFeedController)

export default postRouter;