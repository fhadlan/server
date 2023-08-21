/**MODULE */
const express = require("express");
const {
  getUser,
  getUserFriends,
  addRemoveFriend,
} = require("../controllers/users");

/**CONFIGURATION */
const router = express.Router();

/**ROUTES */
router.route("/:userId").get(getUser);
router.route("/:userId/friends").get(getUserFriends);
router.route("/:userId/:friendId").patch(addRemoveFriend);

/**EXPORT */
module.exports = router;
