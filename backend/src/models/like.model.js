import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User Id is required to like a post'],
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Post id is required to like a post'],
        ref: 'Post'
    }
}, { timestamps: true })

likeSchema.index({ post: 1, user: 1 }, { unique: true })
const likeModel = mongoose.model('Like', likeSchema);
export default likeModel;