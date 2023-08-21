/**MODULE */
const mongoose = require("mongoose");

/**SCHEMA */
const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      required: true,
    },
    picturePath: String,
    likes: {
      type: Map,
      of: Boolean,
      default: {},
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

/**CREATE POST MODEL */
const Post = mongoose.model("Post", PostSchema);

/**EXPORT */
module.exports = Post;
