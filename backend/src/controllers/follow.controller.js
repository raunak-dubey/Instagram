import mongoose from "mongoose";
import followModel from "../models/follow.model.js";
import userModel from "../models/user.model.js";

// ? =================== Follow User Controller ==================== //
export const followUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const followUserId = req.params.userId;

        if (!mongoose.Types.ObjectId.isValid(followUserId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user id."
            });
        }

        if (userId === followUserId) {
            return res.status(400).json({
                success: false,
                message: "You cannot follow yourself.",
            });
        }

        const userExists = await userModel.exists({ _id: followUserId });

        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: "User to be followed does not exist.",
            });
        }

        const existingFollow = await followModel.findOne({
            follower: userId,
            following: followUserId
        });

        if (existingFollow) {
            return res.status(400).json({
                success: false,
                message: "You are already following this user."
            });
        }

        // ? Add follower and following
        const follow = await followModel.create({
            follower: userId,
            following: followUserId
        });

        return res.status(201).json({
            success: true,
            message: "User followed successfully.",
            follow
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "You are already following this user."
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to follow user.",
            error: error.message
        });
    }
}

// ? =================== Unfollow User Controller ==================== //
export const unfollowUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const unfollowUserId = req.params.userId;

        if (!mongoose.Types.ObjectId.isValid(unfollowUserId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user id."
            });
        }

        if (userId === unfollowUserId) {
            return res.status(400).json({
                success: false,
                message: "You cannot unfollow yourself.",
            });
        }

        const userExists = await userModel.exists({ _id: unfollowUserId });

        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: "User to be unfollowed does not exist.",
            });
        }

        const existingFollow = await followModel.findOneAndDelete({
            follower: userId,
            following: unfollowUserId
        });

        if (!existingFollow) {
            return res.status(400).json({
                success: false,
                message: "You are not following this user."
            });
        }

        return res.status(200).json({
            success: true,
            message: "User unfollowed successfully.",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to unfollow user.",
            error: error.message
        });
    }
}