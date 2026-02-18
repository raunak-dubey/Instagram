import mongoose from "mongoose";
import likeModel from "../models/like.model.js";

// ? =================== Like Post Controller ==================== //
export const likePost = async (req, res) => {
    try {
        const userId = req.user.id;
        const postId = req.params.postId;

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid post id."
            });
        }

        const postExists = await postModel.exists({ _id: postId });

        if (!postExists) {
            return res.status(404).json({
                success: false,
                message: "Post does not exist."
            });
        }

        const existingLike = await likeModel.findOne({
            user: userId,
            post: postId
        });

        if (existingLike) {
            return res.status(409).json({
                success: false,
                message: "You have already liked this post."
            });
        }
        // ? Add like
        const like = await likeModel.create({
            user: userId,
            post: postId
        });

        return res.status(201).json({
            success: true,
            message: "Post liked successfully.",
            like
        });

    } catch (error) {
        console.error("Error liking post:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}

// ? =================== Unlike Post Controller ==================== //
export const unlikePost = async (req, res) => {
    try {
        const userId = req.user.id;
        const postId = req.params.postId;

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid post id."
            });
        }

        const postExists = await postModel.exists({ _id: postId });

        if (!postExists) {
            return res.status(404).json({
                success: false,
                message: "Post does not exist."
            });
        }

        const existingLike = await likeModel.findOneAndDelete({
            user: userId,
            post: postId
        });

        if (!existingLike) {
            return res.status(409).json({
                success: false,
                message: "You have not liked this post."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Post unliked successfully."
        });

    } catch (error) {
        console.error("Error unliking post:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}