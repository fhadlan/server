/**MODULE */
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

/**VERIFICATION */
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Silahkan login terlebih dahulu1");
  }

  const token = authHeader.split(" ")[1];
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Silahkan login terlebih dahulu");
  }
};

/**EXPORTS */
module.exports = verifyToken;
