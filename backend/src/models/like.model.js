import mongoose from 'mongoose';

const likeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    }
})

const likeModel = mongoose.model('Like', likeSchema);
export default likeModel;