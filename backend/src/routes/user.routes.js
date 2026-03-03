import { Router } from "express";
import { followUser, unfollowUser, getFollowRequests, acceptFollowRequest, rejectFollowRequest } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const userRouter = Router()

/**
 @route POST /api/user/follow-requests
 @desc Get all the follow requests user received.
 */
userRouter.get('/follow-requests', authMiddleware, getFollowRequests);

/**
 @route POST /api/user/follow/:userId
 @desc Can follow or send requests to user.
 */
userRouter.post('/follow/:userId', authMiddleware, followUser);

/**
 @route Delete /api/user/unfollow/:userIdw
 @desc Can unfollow user.
 */
userRouter.delete('/unfollow/:userId', authMiddleware, unfollowUser);

/**
 @route POST /api/user/follow/:userId/accept
 @desc Can accept follow requests.
 */
userRouter.post('/follow/:userId/accept', authMiddleware, acceptFollowRequest);

/**
 @route Delete /api/user/follow/:userId/reject
 @desc Can reject follow requests.
 */
userRouter.delete('/follow/:userId/reject', authMiddleware, rejectFollowRequest);

export default userRouter;