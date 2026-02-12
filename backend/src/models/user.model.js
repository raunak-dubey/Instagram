import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username Already Exists']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email Already Exists']
    },
    password: {
        type: String,
        required: [true, 'Email is required'],
    },
    bio: {
        type: String,
        default: ""
    },
    avatar: {
        type: String,
        default: 'https://ik.imagekit.io/skietn14x/default_avatar.png'
    }

}, { timestamps: true })

const userModel = mongoose.model('User', userSchema)
export default userModel;