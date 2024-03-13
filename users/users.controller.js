import userModel from "./users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../helper/cloudinary.js";
import prisma from "../src/db.js";

const usersController = {
  listUsers: async (req, res) => {
    try {
      const result = await userModel.getAllUsers();
      res.status(200);
      res.send({
        message: "Get All Users Success",
        data: result,
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  searchUsersById: async (req, res) => {
    try {
      const UserId = parseInt(req.params.id);
      const result = await userModel.getUsersById(UserId);
      res.status(200);
      res.send({
        message: "user was founded",
        data: result,
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  createUsers: async (req, res) => {
    try {
      const { email, password, name, username, phone } = req.body;
      let image = await cloudinary.uploader.upload(req.file.path);

      bcrypt.hash(password, 10, async function (err, hash) {
        if (!hash) {
          console.log("Error hash password");
        } else {
          image = image.url;
          const usersData = { email, password: hash, name, username, phone, image };
          const result = await userModel.postUsers(usersData);
          res.status(200);
          res.send({
            message: "Add a New user success",
            data: result,
          });
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  registerUsers: async (req, res) => {
    try {
      const { email, password, confPassword, name, username, phone } = req.body;
      if (password !== confPassword)
        return res.status(401).json({
          message: "Your confirm password doesn't match with your password",
        });
      bcrypt.hash(password, 10, async function (err, hash) {
        if (!hash) {
          console.log("Error hash password");
        } else {
          const userData = { email, password: hash, confPassword, name, username, phone };
          const result = await userModel.registerUsers(userData);
          console.log(result);
          res.status(200);
          res.send({
            message: "Add a New user success",
            data: result,
          });
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  updateAllDataUsers: async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const { email, password, name, username, phone } = req.body;
      let image = await cloudinary.uploader.upload(req.file.path);
      bcrypt.hash(password, 10, async function (err, hash) {
        if (!hash) {
          console.log("Error hash password");
        } else {
          image = image.url;
          const userData = { email, password: hash, name, username, phone, image };
          const result = await userModel.updateAllDataUsers(userId, userData);
          console.log(result);
          res.status(200);
          res.send({
            message: "update user success",
            data: result,
          });
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  updateProfilPicture: async (req, res) => {
    try {
      const userId = parseInt(req.userId);
      let image = await cloudinary.uploader.upload(req.file.path);
      image = image.url;
      const userData = { image };
      const result = await userModel.updateDataUsers(userId, userData);
      res.status(200);
      res.send({
        message: "update user success",
        data: result,
      });
    } catch (err) {
      console.log(err.message);
    }
  },

  deleteusers: async (req, res) => {
    try {
      const UserId = parseInt(req.params.id);
      const result = await userModel.deleteUsers(UserId);
      res.status(200);
      res.send({
        message: "Users deleted",
        data: result,
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  loginUsers: async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await userModel.postLogin(email);
  
      if (!result) {
        return res.status(401).json({
          error: "Authentication failed",
        });
      }
  
      const passwordMatch = await bcrypt.compare(password, result.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: "Your email or password is incorrect" });
      }
  
      const token = jwt.sign({ id: result.id, name: result.name }, process.env.SECRET_ACCESS_KEY, { expiresIn: "1h" });
      const refreshToken = jwt.sign({ id: result.id, name: result.name }, process.env.SECRET_ACCESS_KEY, { expiresIn: "1d" });
  
      res.json({
        message: "User berhasil login",
        token,
        refreshToken,
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  profile: async (req, res) => {
    try {
      const UserId = parseInt(req.userId);
      console.log(UserId);
      const result = await userModel.profile(UserId);
      res.status(200);
      res.send({
        message: "user was founded",
        data: result,
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  recipe: async (req, res) => {
    try {
      const userId = parseInt(req.userId);
      const result = await prisma.$queryRaw`SELECT * FROM recipes WHERE users_id=${userId}`;
      res.status(200);
      res.send({
        message: "Recipe was founded",
        data: result,
      });
    } catch (err) {
      console.log(err.message);
    }
  },
};

export default usersController;
