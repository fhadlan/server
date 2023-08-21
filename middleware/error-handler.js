const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Terjadi error di server",
  };

  if (err.name === "ValidationError") {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }

  if (err.name === "CastError") {
    customError.message = `Job dengan id ${err.value} tidak ditemukan`;
    customError.statusCode = 404;
  }

  if (err.code && err.code === 11000) {
    customError.message = `Email dengan ${err.keyValue.email} sudah terdaftar`;
    customError.statusCode = 400;
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res
    .status(customError.statusCode)
    .json({ error: customError.message });
};

module.exports = errorHandlerMiddleware;
