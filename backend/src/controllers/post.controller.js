import ImageKit, { toFile } from '@imagekit/nodejs';
import postModel from '../models/post.model.js'

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// ? =================== Create Post Controller ==================== //
export const createPostController = async (req, res) => {
    try {
        if (!req.file || !req.body.caption) {
            return res.status(400).json({
                success: false,
                message: "Caption and Image file is required.",
            });
        }
        const file = await client.files.upload({
            file: await toFile(Buffer.from(req.file.buffer), 'file'),
            fileName: req.file.originalname,
            folder: 'insta-posts'
        });

        const post = await postModel.create({
            caption: req.body.caption,
            imgUrl: file.url,
            user: req.user.id
        })

        return res.status(201).json({
            success: true,
            message: "Post created successfully.",
            post,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create post.",
        });
    }
}

// ? =================== Get Post Controller ==================== //
export const getPostController = async (req, res) => {
    try {
        const post = await postModel.find({
            user: req.user.id
        })

        return res.status(200).json({
            success: true,
            message: 'Post Fetch Successfully',
            post,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch post.'
        })
    }
}

// ? =================== Get Post Details Controller ==================== //
export const getPostDetailsController = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.postId;

    const post = await postModel.findById(postId)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    const isValidUser = post.user.toString() === userId;

    if (!isValidUser) {
      return res.status(403).json({
        success: false,
        message: "Forbidden Content.",
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Post Fetch Successfully',
      post,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch post.",
    });

  }
}

// ? =================== Get All Feed Controller ==================== //
export const getAllFeedController = async (req, res) => {
  try {
    const post = await postModel.find().populate('user')

    if (post.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No post found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Post Fetch Successfully',
      post,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch post.",
    });
  }
}

// ? =================== Like Post Controller ==================== //
export const likePostController = async () => {
  
}