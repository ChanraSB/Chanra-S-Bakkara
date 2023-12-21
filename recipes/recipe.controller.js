// leyer for handling req and res. Ussually, this layer used to handling body validation.

// import express from "express";
// import prisma from "../src/db.js";
import model from "../recipes/recipe.model.js";
import cloudinary from "../helper/cloudinary.js";

const recipesController = {
  listRecipes: async (req, res) => {
    try {
      const result = await model.getAllRecipes();
      res.status(200);
      res.send({
        message: "Get All Recipes Success",
        data: result,
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  searchRecipeById: async (req, res) => {
    try {
      const recipeId = parseInt(req.params.id);
      const result = await model.getRecipebyId(recipeId);
      res.status(200);
      res.send({
        message: "Recipe was founded",
        data: result,
      });
    } catch (err) {
      console.log(err.massage);
    }
  },
  createRecipe: async (req, res) => {
    try {
      const { title, ingredient, video_link } = req.body;
      const users_id = parseInt(req.body.users_id);
      let image = await cloudinary.uploader.upload(req.file.path);
      image = image.url;
      const newRecipeData = { title, ingredient, image, video_link, users_id };
      console.log(newRecipeData);
      const result = await model.postRecipe(newRecipeData);
      res.status(200);
      res.send({
        message: "Add a New Recipes success",
        data: result,
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  updateAllDataRecipe: async (req, res) => {
    try {
      const recipeId = parseInt(req.params.id);
      const { title, ingredient, video_link } = req.body;
      const users_id = parseInt(req.body.users_id);
      let image = await cloudinary.uploader.upload(req.file.path);
      console.log(image);
      image = image.url;
      const newRecipeData = { title, ingredient, image, video_link, users_id };
      const result = await model.updateAllDataRecipe(recipeId, newRecipeData);
      res.status(200);
      res.send({
        message: "update recipes success",
        data: result,
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  updateDataRecipe: async (req, res) => {
    try {
      const recipeId = parseInt(req.params.id);
      const users_id = parseInt(req.body.users_id);
      const { title, ingredient, video_link } = req.body;
      let image = await cloudinary.uploader.upload(req.file.path);
      image = image.url;
      const newRecipeData = { title, ingredient, image, video_link, users_id };
      const result = await model.updateDataRecipe(recipeId, newRecipeData);
      res.status(200);
      res.send({
        message: "update recipes success",
        data: result,
      });
    } catch (err) {
      console.log(err.message);
    }
  },

  deleteRecipe: async (req, res) => {
    try {
      const recipeId = parseInt(req.params.id);
      const result = await model.deleteRecipe(recipeId);
      res.status(200);
      res.send("Reciped deleted", result);
    } catch (err) {
      console.log(err.message);
    }
  },
};
export default recipesController;
