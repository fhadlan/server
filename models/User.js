/**MODULE */
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**SCHEMA */
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Silahkan isi nama anda"],
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: [true, "Silahkan isi nama anda"],
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: [true, "Silahkan isi email"],
      max: 50,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email yang anda masukkan tidak valid",
      ],
    },
    gender: {
      type: String,
      enum: { values: ["male", "female"] },
    },
    password: {
      type: String,
      required: [true, "Silahkan isi password anda"],
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: {
      type: String,
      default: "",
    },
    occupation: {
      type: String,
      default: "",
    },
    viewedProfile: {
      type: Number,
      default: 0,
    },
    impression: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

/**PRE-SAVE USER */
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/**USER METHODS */
UserSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

UserSchema.methods.createToken = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};
/**CREATE USER */
const User = mongoose.model("User", UserSchema);

/**EXPORTS */
module.exports = User;
