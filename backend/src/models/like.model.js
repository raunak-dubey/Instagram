import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'UserId is required to create a like']
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'PostId is required to create a like']
    }
}, {timestamps: true})

likeSchema.index({ user: 1, post: 1 }, { unique: true });

const likeModel = mongoose.model('Like', likeSchema)
export default likeModel;