import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { likePost, unlikePost } from "../controllers/like.controller.js";

const likeRouter = Router();

// ? =================== Like Post Api [protected] ==================== //
likeRouter.post('/:postId', authMiddleware, likePost);

// ? =================== Unlike Post Api [protected] ==================== //
likeRouter.delete('/:postId', authMiddleware, unlikePost);

export default likeRouter;