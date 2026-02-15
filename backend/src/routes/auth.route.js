import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

const authRouter = Router();

// ? =================== Register Api ==================== //
authRouter.post('/register', registerUser)

// ? =================== Login Api ==================== //
authRouter.post('/login', loginUser)

export default authRouter;