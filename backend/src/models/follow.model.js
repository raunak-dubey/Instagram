    import mongoose from "mongoose";

    const followSchema = new mongoose.Schema({
        follower: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'FollowerId is required to create a follow']
        },
        following: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'FollowingId is required to create a follow']
        },
        status: {
            type: String,
            enum: ['pending', 'accepted'],
            default: 'pending'
        }

    }, {timestamps: true})

    followSchema.index({ follower: 1, following: 1 }, { unique: true });
    followSchema.index({ following: 1, status: 1 });

    const followModel = mongoose.model('Follow', followSchema)
    export default followModel;