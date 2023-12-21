// import prisma from "../src/db.js";
import express from "express";
import recipesController from "../recipes/recipe.controller.js";
import upload from "../src/middleware/uploadMiddleware.js";
import verifytoken from "../src/middleware/authMiddleware.js";
const router = express.Router();

//  start simple crud
router.get("/recipes", recipesController.listRecipes);
router.get("/recipes/:id", recipesController.searchRecipeById);
router.post("/recipes", verifytoken, upload, recipesController.createRecipe);
router.delete("/recipes/:id", verifytoken, recipesController.deleteRecipe);
router.put("/recipes/:id", verifytoken, upload, recipesController.updateAllDataRecipe);
router.patch("/recipes/:id", verifytoken, upload, recipesController.updateDataRecipe);
export default router;
