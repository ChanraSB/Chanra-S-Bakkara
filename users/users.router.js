import express from "express";
import userController from "./users.controller.js";
import verifytoken from "../src/middleware/authMiddleware.js";
import upload from "../src/middleware/uploadMiddleware.js";

const userRouter = express.Router();

userRouter.get("/users", verifytoken, userController.listUsers);
userRouter.get("/users/:id", userController.searchUsersById);
userRouter.post("/users", verifytoken, upload, userController.createUsers);
userRouter.post("/login", userController.loginUsers);
userRouter.post("/register", userController.registerUsers);
userRouter.delete("/users/:id", verifytoken, userController.deleteusers);
userRouter.put("/users/:id", verifytoken, upload, userController.updateAllDataUsers);
userRouter.patch("/users/:id", verifytoken, upload, userController.updateDataUsers);

export default userRouter;
