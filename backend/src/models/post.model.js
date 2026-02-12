import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imgUrl: {
        type: String,
        required: [true, 'image is required to create a post']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'UserId is required to create a post']
    }
}, {timestamps: true})

const postModel = mongoose.model('Post', postSchema)
export default postModel;