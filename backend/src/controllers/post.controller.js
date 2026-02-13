import postModel from "../models/post.model.js";
import ImageKit, { toFile } from "@imagekit/nodejs";

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

export const createPostController = async (req, res) => {
  try {
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

    res.status(201).json({
      message: 'Post Created Successfully',
      post
    })
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
}