import { Router } from "express";
import { registerUser, loginUser, getMeController } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const authRouter = Router();

// ? =================== Register Api ==================== //
authRouter.post('/register', registerUser)

// ? =================== Login Api ==================== //
authRouter.post('/login', loginUser)

// ? =================== Get Me Api ==================== //
authRouter.get('/get-me', authMiddleware, getMeController)

export default authRouter;