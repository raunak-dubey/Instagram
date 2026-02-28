import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        select: false,
        required: [true, 'Password is required']
    },
    bio: {
        type: String,
        default: ''
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        default: 'https://ik.imagekit.io/skietn14x/default_avatar.png'
    }
});

const userModel = mongoose.model('User', userSchema)
export default userModel;