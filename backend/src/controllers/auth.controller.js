import userModel from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// ? =================== Register Api ==================== //
export const registerUser = async (req, res) => {
    const { username, email, password, bio, avatar } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [ { username }, { email } ]
    })

    if (isUserAlreadyExists)
        return res.status(409).json({
            message: `User Already Exists By this
            ${isUserAlreadyExists.email === email ? "Email" : "Username"}`
        })

    const user = await userModel.create({
        username,
        email,
        bio,
        avatar,
        password: await bcrypt.hash(password, 10)
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.cookie('token', token)

    res.status(201).json({
        message: 'User Registered Successfully',
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            avatar: user.avatar
        }
    })
}

// ? =================== Login Api ==================== //
export const loginUser = async (req, res) => {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [ {username}, {email}]
    })

    if(!user) return res.status(404).json({ message: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(401).json({
            message: `${user.email === email ? "Email" : "Username"} or password is Invalid`
        })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.cookie('token', token)

    res.status(200).json({
        message: 'User LoggedIn Successfully',
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            avatar: user.avatar
        }
    })
}