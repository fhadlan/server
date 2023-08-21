/**MODULE */
const express = require("express");
const multer = require("multer");
const { register, login, cekEmail } = require("../controllers/auth");

/**CONFIGURATION */
const router = express.Router();

/**FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
//upload.single("picture")
/**ROUTES */
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/cek").post(cekEmail);

/**EXPORT */
module.exports = router;
