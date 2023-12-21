import userModel from "./users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../helper/cloudinary.js";
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
      const UserId = parseInt(req.params.id);
      const { email, password, name, username, phone } = req.body;
      let image = await cloudinary.uploader.upload(req.file.path);
      bcrypt.hash(password, 10, async function (err, hash) {
        if (!hash) {
          console.log("Error hash password");
        } else {
          image = image.url;
          const userData = { email, password: hash, name, username, phone, image };
          const result = await userModel.updateAllDataUsers(UserId, userData, image);
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
  updateDataUsers: async (req, res) => {
    try {
      const UserId = parseInt(req.params.id);
      let image = await cloudinary.uploader.upload(req.file.path);
      const { email, password, name, username, phone } = req.body;
      bcrypt.hash(password, 10, async function (err, hash) {
        if (!hash) {
          console.log("Error hash password");
        } else {
          image = image.url;
          const userData = { email, password: hash, name, username, phone, image };
          const result = await userModel.updateDataUsers(UserId, userData);
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
          error: "authentication failed",
        });
      }
      const passwordMatch = bcrypt.compare(password, result.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Authentication failed" });
      }
      const token = jwt.sign({ id: result.id, name: result.name }, process.env.SECRET_ACCESS_KEY, { expiresIn: "1h" });
      console.log(token);
      res.json({
        message: "User berhasil login",
        token,
      });
    } catch (err) {
      console.log(err.message);
    }
  },
};

export default usersController;
