import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
const verifyToken = (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];

      let decoded = jwt.verify(token, process.env.SECRET_ACCESS_KEY);
      req.userId = decoded.id;
      return next();
    } else {
      next(createHttpError(400, "server need token"));
    }
  } catch (error) {
    console.log(error.name);
    if (error && error.name === "JsonWebTokenError") {
      next(createHttpError(400, "token invalid"));
    } else if (error && error.name === "TokenExpiredError") {
      next(createHttpError(400, "token expired"));
    } else {
      next(createHttpError(400, "Token not active"));
    }
  }
};

export default verifyToken;
