/**MODULE */
const { StatusCodes } = require("http-status-codes");
const Post = require("../models/Post");
const User = require("../models/User");

/**CREATE FUNCTION */
const createPost = async (req, res) => {
  const { userId, description, picturePath } = req.body;
  const createNewPost = await Post.create({ userId, description, picturePath });
  const posts = await Post.find();
  res.status(StatusCodes.CREATED).json(posts);
};

/**READ POST FEED*/
const getFeedPosts = async (req, res) => {
  const posts = await Post.find().populate(
    "userId",
    "firstName lastName picturePath location"
  );
  res.status(StatusCodes.OK).json(posts);
};

/**GET POST OF A USER */
const getUserPosts = async (req, res) => {
  const { userId } = req.params;
  const posts = await Post.find({ userId: userId });
  res.status(StatusCodes.OK).json(posts);
};

/**UPDATE POST */
const likePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;
  //cari 1 post dengan id
  const post = await Post.findById(postId);
  //cari apakah userId sekarang ada didalam object likes
  const isLiked = post.likes.get(userId);
  //jike userid sekarang ada berarti dia sudah like, jika ada hapuse userId dati likes jika tidak ada set userId ke object post.likes
  if (isLiked) {
    post.likes.delete(userId);
  } else {
    post.likes.set(userId, true);
  }
  //update ke database
  const updatePost = await Post.findByIdAndUpdate(
    postId,
    { likes: post.likes },
    { new: true }
  ).populate("userId", "firstName lastName picturePath location");
  res.status(StatusCodes.OK).json(updatePost);
};

module.exports = {
  createPost,
  getFeedPosts,
  getUserPosts,
  likePost,
};
