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

        const userToFollow = await userModel.findById(followUserId).select("isPrivate").lean();

        if (!userToFollow) {
            return res.status(404).json({
                success: false,
                message: "User to be followed does not exist.",
            });
        }


        // ? Check if already following or request pending
        const existing = await followModel.findOne({
            follower: userId,
            following: followUserId
        });

        if (existing) {
            if (existing.status === "pending") {
                return res.status(409).json({
                    success: false,
                    message: "Follow request already sent and is pending.",
                });
            }

            return res.status(409).json({
                success: false,
                message: "You are already following this user.",
            });
        }

        const status = userToFollow.isPrivate ? "pending" : "accepted";

        // ? Add follower and following
        const follow = await followModel.create({
            follower: userId,
            following: followUserId,
            status
        });

        return res.status(201).json({
            success: true,
            message: status === "pending"
                ? "Follow request sent."
                : "User followed successfully.",
            follow
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Already requested/following."
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to follow user.",
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

        const userExists = await userModel.findById(unfollowUserId);

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
        });
    }
}

// ? =================== Get Follow Requests Controller ==================== //
export const getFollowRequests = async (req, res) => {
    try {
        const userId = req.user.id;

        const requests = await followModel
            .find({
                following: userId,
                status: "pending"
            })
            .populate("follower", "username avatar");

        return res.json({
            success: true,
            requests
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch requests."
        });
    }
};

// ? =================== Accept Follow Request Controller ==================== //
export const acceptFollowRequest = async (req, res) => {
    try {
        const userId = req.user.id;
        const requesterId = req.params.userId;

        if (!mongoose.Types.ObjectId.isValid(requesterId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user id."
            });
        }

        const follow = await followModel.findOneAndUpdate(
            {
                follower: requesterId,
                following: userId,
                status: "pending"
            },
            { status: "accepted" },
            { new: true }
        );

        if (!follow) {
            return res.status(404).json({
                success: false,
                message: "Follow request not found."
            });
        }

        return res.json({
            success: true,
            message: "Request accepted.",
            follow
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to accept request."
        });
    }
};

// ? =================== Reject Follow Request Controller ==================== //
export const rejectFollowRequest = async (req, res) => {
    try {
        const userId = req.user.id;
        const requesterId = req.params.userId;

        if (!mongoose.Types.ObjectId.isValid(requesterId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user id."
            });
        }

        const follow = await followModel.findOneAndDelete({
            follower: requesterId,
            following: userId,
            status: "pending"
        });

        if (!follow) {
            return res.status(404).json({
                success: false,
                message: "Follow request not found."
            });
        }

        return res.json({
            success: true,
            message: "Request rejected."
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to reject request."
        });
    }
};