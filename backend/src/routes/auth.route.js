import Router from 'express'
import {registerUser, loginUser} from '../controllers/auth.controller.js'

const authRouter = Router()

// ? @route /api/auth/register
authRouter.post('/register', registerUser)

// ? @route /api/auth/login
authRouter.post('/login', loginUser)

export default authRouter