import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'FollowerId is required to Follow'],
    },
    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'FolloweeId is required to Follow'],
    },
    status: {
        type: String,
        default: "pending",
        enum: {
            values: [ "pending", "accepted"],
            message: "status can only be pending, accepted"
        }
    }

}, { timestamps: true })

followSchema.index({ follower: 1, following: 1 }, { unique: true })
followSchema.index({ following: 1, status: 1 })

const followModel = mongoose.model('Follow', followSchema)
export default followModel;