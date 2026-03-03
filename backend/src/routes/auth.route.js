import Router from 'express'
import {registerUser, loginUser, getMeController} from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js'

const authRouter = Router()

/**
 @route POST /api/auth/register
 @desc Regsister a new user
 */
authRouter.post('/register', registerUser)

/**
 @route POST /api/auth/login
 @desc Login a user
 */
authRouter.post('/login', loginUser)

/**
 @route POST /api/auth/get-me
 @desc Get the info of user logged in
 */
authRouter.get('/get-me', authMiddleware, getMeController)

export default authRouter