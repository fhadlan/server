/* MODULE */
const mongoose = require("mongoose");

/**CONNECTION FUNCTION */
const connectDB = (uri) => {
  return mongoose.connect(uri);
};

/**EXPORT */
module.exports = connectDB;
