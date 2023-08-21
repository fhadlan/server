/* MODULE */
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const { log } = require("console");

/**CONNECTION AND ROUTES FILE */
const connectDB = require("./db/connect");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const postsRoutes = require("./routes/posts");

/**MIDDLEWARE */
const errorHandlerMiddleware = require("./middleware/error-handler");
const authenticationMiddleware = require("./middleware/authentication");

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/**ROUTER */
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", authenticationMiddleware, usersRoutes);
app.use("/api/v1/posts", postsRoutes);

/**USE MIDDLEWARE */
app.use(errorHandlerMiddleware);

/**CONNECT DATABASE & APP LISTEN*/
const port = process.env.PORT || 3001;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, log(`App is listening on port ${port}`));
  } catch (error) {
    log(error);
  }
};
start();
