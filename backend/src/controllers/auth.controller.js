import userModel from '../models/user.model.js';
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/generateToken.js';

// ? @desc    Register a new user
// ? @route   POST /api/auth/register
// ? @access  Public

export const registerUser = async (req, res) => {
    try {
        const { username, email, password, bio, isPrivate, avatar } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username, Email and Password are required to register'
            });
        }

        const isUserAlreadyExists = await userModel.findOne({
            $or: [{ username }, { email }]
        })

        if (isUserAlreadyExists) {
            return res.status(409).json({
                success: false,
                message: `User is Already Exists with this ${isUserAlreadyExists.email === email ? 'Email' : 'Username'}`
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            username, email, password: hashedPassword, bio, isPrivate, avatar
        })

        const token = generateToken(user._id)

        res.cookie('Token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
        })

        return res.status(201).json({
            success: true,
            message: 'Registration Successfull',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                bio: user.bio,
                isPrivate: user.isPrivate,
                avatar: user.avatar
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Registration Failed'
        })
    }
}

// ? @desc    Login a user
// ? @route   POST /api/auth/login
// ? @access  Public

export const loginUser = async (req, res) => {
    try {
        const { identifier, password } = req.body

        if (!identifier || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username/Email and Password are required to login'
            });
        }

        const user = await userModel.findOne({
            $or: [
                { username: identifier.toLowerCase() },
                { email: identifier }
            ]
        }).select("+password")

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Credentials'
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Credentials'
            })
        }

        const token = generateToken(user._id)
        res.cookie('Token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
        })

        return res.status(200).json({
            success: true,
            message: 'Login Successfull',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                bio: user.bio,
                isPrivate: user.isPrivate,
                avatar: user.avatar
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Login Failed'
        })
    }
}