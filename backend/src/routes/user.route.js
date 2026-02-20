import { Router } from "express";
import { followUser, unfollowUser, getFollowRequests, acceptFollowRequest, rejectFollowRequest } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const userRouter = Router()

// ? =================== Follow Requests Api [protected] ==================== //
userRouter.get('/follow-requests', authMiddleware, getFollowRequests);

// ? =================== Follow User Api [protected] ==================== //
userRouter.post('/follow/:userId', authMiddleware, followUser);

// ? =================== Unfollow User Api [protected] ==================== //
userRouter.delete('/follow/:userId', authMiddleware, unfollowUser);

// ? =================== Accept Follow Request Api [protected] ==================== //
userRouter.post('/follow/:userId/accept', authMiddleware, acceptFollowRequest);

// ? =================== Reject Follow Request Api [protected] ==================== //
userRouter.delete('/follow/:userId/reject', authMiddleware, rejectFollowRequest);

export default userRouter;