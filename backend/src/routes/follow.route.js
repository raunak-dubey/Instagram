import { Router } from "express";
import { followUser, unfollowUser } from "../controllers/follow.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const followRouter = Router()

// ? =================== Follow User Api [protected] ==================== //
followRouter.post('/follow/:userId', authMiddleware, followUser);

// ? =================== Unfollow User Api [protected] ==================== //
followRouter.post('/unfollow/:userId', authMiddleware, unfollowUser);

export default followRouter;