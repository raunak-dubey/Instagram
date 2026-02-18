import { Router } from "express";
import { followUser, unfollowUser } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const userRouter = Router()

// ? =================== Follow User Api [protected] ==================== //
userRouter.post('/follow/:userId', authMiddleware, followUser);

// ? =================== Unfollow User Api [protected] ==================== //
userRouter.post('/unfollow/:userId', authMiddleware, unfollowUser);

export default userRouter;