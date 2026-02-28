import Router  from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { createPostController, getPostController, getPostDetailsController, getAllFeedController } from '../controllers/post.controller.js'
import uploadMiddleware from '../middlewares/upload.middleware.js';

const postRouter = Router();

/**
 @route POST /api/posts/
 @desc Create posts api [protected]
 */
postRouter.post('/', authMiddleware, uploadMiddleware, createPostController)

/**
 @route Get /api/posts/
 @desc Get posts api [protected]
 */
postRouter.get('/', authMiddleware, getPostController)

/**
 @route Get /api/posts/details/:postId
 @desc Posts details api [protected]
 */
postRouter.get('/details/:postId', authMiddleware, getPostDetailsController)

/**
 @route Get /api/posts/feed
 @desc Get Posts Feed api [protected]
 */
postRouter.get('/feed', authMiddleware, getAllFeedController)

/**
 @route POST /api/posts/like
 @desc Like posts api [protected]
 */
postRouter.post('/likes', authMiddleware, getAllFeedController)

/**
 @route Delete /api/posts/like
 @desc unlike posts api [protected]
 */
postRouter.delete('/likes', authMiddleware, getAllFeedController)

export default postRouter