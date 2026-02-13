import postModel from "../models/post.model.js";
import ImageKit, { toFile } from "@imagekit/nodejs";

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

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
      folder: 'instagram-posts'
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