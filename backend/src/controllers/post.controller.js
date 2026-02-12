import postModel from "../models/post.model.js";
import ImageKit, { toFile } from "@imagekit/nodejs";

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

export const createPostController = async (req, res) => {
  console.log(req.body, req.file);
  const file = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), 'file'),
    fileName: 'test',
  });

  res.send(file)
}