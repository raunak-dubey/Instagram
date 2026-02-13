import userModel from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import generateToken from '../utils/generateToken.js';

// ? =================== Register Api ==================== //
export const registerUser = async (req, res) => {
    try {
        const { username, email, password, bio, avatar } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Username, email and password are required.",
            });
        }

        const isUserAlreadyExists = await userModel.findOne({
            $or: [{ username }, { email }]
        })

        if (isUserAlreadyExists)
            return res.status(409).json({
                success: false,
                message: `User already exists with this ${
                    isUserAlreadyExists.email === email ? "email" : "username"
                }.`,
            });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            bio,
            avatar,
            password: hashedPassword
        })

        const token = generateToken(user._id)

        res.cookie('token', token)

        res.status(201).json({
            message: 'User Registered Successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                bio: user.bio,
                avatar: user.avatar
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error during registration.",
        });
    }
}

// ? =================== Login Api ==================== //
export const loginUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if ((!username || !email) && !password) {
            return res.status(400).json({
                success: false,
                message: "Username/email and password are required.",
            });
        }

        const user = await userModel.findOne({
            $or: [{ username }, { email }]
        })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: `Invalid credentials`
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: `Invalid credentials`
            })
        }

        const token = generateToken(user._id)
        res.cookie('token', token)

        res.status(200).json({
            success: true,
            message: "User logged in successfully.",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                bio: user.bio,
                avatar: user.avatar,
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error during login.",
        });
    }

}