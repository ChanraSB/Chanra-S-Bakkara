import jwt from "jsonwebtoken";
// import role from "../Role/UserRole.js";
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ massage: "access denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_ACCESS_KEY);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "invalid token" });
  }
};

// const simpleAuth = (req, res, next) => {
//   console.log(role);
//   if (role == null) {
//     res.status(401);
//     return res.send("please login first");
//   }
//   next();
// };

export default verifyToken;
