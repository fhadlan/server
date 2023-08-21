/**MODULE */
const express = require("express");
const multer = require("multer");
const path = require("path");

const { createPost, getFeedPosts, likePost } = require("../controllers/posts");

/**CONFIGURATION */
const router = express.Router();

/**FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    cb(null, path.join(__dirname, "../public/assets/"));
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/**ROUTES */
router.route("/").get(getFeedPosts).post(upload.single("picture"), createPost);
router.route("/:userId/posts").get();
router.route("/:postId/like").patch(likePost);

/**EXPORT */
module.exports = router;
