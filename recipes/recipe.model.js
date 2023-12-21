import prisma from "../src/db.js";

// model bertujuan untuk menghandle bisnis logic

const recipeModel = {
  getAllRecipes: async () => {
    const recipe = await prisma.recipes.findMany();
    return recipe;
  },
  getRecipebyId: async (id) => {
    if (typeof id !== "number") {
      throw Error("ID is not a number");
    }

    const recipe = await prisma.recipes.findUnique({
      where: {
        id,
      },
    });
    if (!recipe) {
      throw Error("Recipe not found");
    }

    return recipe;
  },
  postRecipe: async (newRecipeData) => {
    const recipe = await prisma.recipes.create({
      data: {
        users_id: newRecipeData.users_id,
        title: newRecipeData.title,
        ingredient: newRecipeData.ingredient,
        image: newRecipeData.image,
        video_link: newRecipeData.video_link,
      },
    });
    return recipe;
  },
  updateAllDataRecipe: async (id, recipeData) => {
    if (!(recipeData.users_id && recipeData.title && recipeData.ingredient && recipeData.image && recipeData.video_link)) {
      throw Error("some field are empty");
    }
    const recipe = await prisma.recipes.update({
      where: {
        id,
      },
      data: {
        users_id: recipeData.users_id,
        title: recipeData.title,
        ingredient: recipeData.ingredient,
        image: recipeData.image,
        video_link: recipeData.video_link,
      },
    });
    return recipe;
  },
  updateDataRecipe: async (id, recipeData) => {
    const recipe = await prisma.recipes.update({
      where: {
        id,
      },
      data: {
        users_id: recipeData.users_id,
        title: recipeData.title,
        ingredient: recipeData.ingredient,
        image: recipeData.image,
        video_link: recipeData.video_link,
      },
    });
    return recipe;
  },
  deleteRecipe: async (id) => {
    if (typeof id !== "number") {
      throw Error("ID is not a number");
    }
    const recipe = await prisma.recipes.delete({
      where: {
        id,
      },
    });
    return recipe;
  },
};

const model = recipeModel;

export default model;
