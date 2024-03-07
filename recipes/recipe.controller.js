import fetch from "node-fetch";
import model from "../recipes/recipe.model.js";
import cloudinary from "../helper/cloudinary.js";

const recipesController = {
  listRecipes: async (req, res) => {
    try {
      const { page, pageSize, filter, search, sort, sortOrder } = req.query;
      const result = await model.getAllRecipes({
        page: parseInt(page) || 1,
        pageSize: parseInt(pageSize) || 5,
        filter: filter ? JSON.parse(filter) : {},
        search: search || "",
        sort: sort || "id",
        sortOrder: sortOrder || "asc",
      });
      const { recipe, totalPages } = result;
      res.status(200).send({
        message: "Get All recipes Success",
        data: {
          recipe,
          totalPages,
        },
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  searchRecipeById: async (req, res) => {
    try {
      const recipeId = parseInt(req.params.id);
      console.log(recipeId);
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
      const users_id = parseInt(req.userId);
      let image = await cloudinary.uploader.upload(req.file.path);
      image = image.url;
      const newRecipeData = { title, ingredient, image, video_link, users_id};
      console.log(newRecipeData);
      const result = await model.postRecipe(newRecipeData);
      
      fetch(`https://api.onesignal.com/notifications` , {
        method : "POST",
        headers: {
          accept: 'application/json',
          Authorization: 'Basic MzIyMDU5YmYtNDdlNC00OTY0LTgwOWItMzUwYTZlOWZlN2Ux',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          app_id: 'bb0eda80-cb20-441f-8489-78f41f33daa4',
          name: 'New Recipe information',
          included_segments: ['Total Subscriptions'],
          contents: {en: `There's a New Recipe. Dont forget to check it out :)`},
          headings: {en: `New Recipe`},
          
  
        })
      })
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
      const users_id = parseInt(req.userId);
      let image = await cloudinary.uploader.upload(req.file);
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
  searchRecipeByUserId: async (req, res) => {
    try {
      const userID = parseInt(req.params.users_id);
      console.log(userID);
      const result = await model.getRecipeByUserId(userID);
      res.status(200);
      res.send({
        message: "Recipe was founded",
        data: result,
      });
    } catch (err) {
      console.log(err.massage);
    }
  },
  likeRecipe : async (req, res) => {
 
      try {
        const userId = parseInt(req.userId); 
        const recipeId = parseInt(req.params.id);
  
        const updatedRecipe = await model.likeRecipe(userId, recipeId);
  
        res.status(200).json({ message: "Recipe liked successfully.", recipe: updatedRecipe });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    
  },
  unLikeRecipe : async (req, res) => {
 
      try {
        const userId = parseInt(req.userId); 
        const recipeId = parseInt(req.params.id);
  
        const updatedRecipe = await model.unLikeRecipe(userId, recipeId);
  
        res.status(200).json({ message: "Recipe unliked successfully.", recipe: updatedRecipe });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    
  },
  getPopularRecipes: async (req, res) => {
    try {
      const likes_count = req.body
      const result = await model.getPopularRecipes(likes_count);
      res.status(200).json({
        message: "Popular recipes retrieved successfully",
        data: result,
      });
    } catch (err) {
      console.error(err);
      
    }
  },
  getNewRecipes: async (req, res) => {
    try {
      const createdAt = req.body
      const result = await model.getNewRecipes(createdAt);
      res.status(200).json({
        message: "Popular recipes retrieved successfully",
        data: result,
      });
    } catch (err) {
      console.error(err);
      
    }
  },
  getMyLike : async (req, res) => {
    try {
      const recipeId = parseInt(req.params.id)
      const userId = parseInt(req.userId)
      const result = await model.getmylike(recipeId, userId)
      res.status(200).json({
        data : result
      })
    } catch (error) {
      console.log(error)
    }
  }

};
export default recipesController;
