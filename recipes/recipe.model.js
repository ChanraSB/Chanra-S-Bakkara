import prisma from "../src/db.js";

// model bertujuan untuk menghandle bisnis logic

const recipeModel = {
  getAllRecipes: async ({
    page = 1,
    pageSize = 10,
    filter = {},
    search = "",
    sort = "id",
    sortOrder = "asc",
  }) => {
    const skip = (page - 1) * pageSize;
    const totalRecipe = await prisma.recipes.count({
      where: {
        AND: [filter, search ? { title: { contains: search } } : {}],
      },
    });
    const recipe = await prisma.recipes.findMany({
      where: {
        AND: [filter, search ? { title: { contains: search } } : {}],
      },
      orderBy: { [sort]: sortOrder.toLowerCase() },
      skip,
      take: pageSize,
    });
    const totalPages = Math.ceil(totalRecipe / pageSize);
    return { recipe, totalPages };
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
        title: newRecipeData.title,
        ingredient: newRecipeData.ingredient,
        image: newRecipeData.image,
        video_link: newRecipeData.video_link,
        users_id : newRecipeData.users_id
      },
    });
    return recipe;
  },
  updateAllDataRecipe: async (id, recipeData) => {
    if (
      !(
        recipeData.users_id &&
        recipeData.title &&
        recipeData.ingredient &&
        recipeData.image &&
        recipeData.video_link
      )
    ) {
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
  getRecipeByUserId: async (users_id) => {
    const recipe = await prisma.recipes.findUnique({
      where: {
        users_id,
      },
    });
    return recipe;
  },
  likeRecipe: async (userId, recipeId) => {
      const existingLike = await prisma.likes.findFirst({
        where: {
          userId: userId,
          recipeId: recipeId
        }
      });

      if (existingLike) {
        throw new Error("You've already liked this recipe.");
      }
      await prisma.likes.create({
        data: {
          userId: userId,
          recipeId: recipeId
        }
      });
      const updatedRecipe = await prisma.recipes.update({
        where: { id : recipeId, },
        data: { likes_count: { increment: 1 } },
        include: { likes: true } 
      });

      return updatedRecipe;
    
  },
  unLikeRecipe: async (userId, recipeId) => {
   
    const existingLike = await prisma.likes.findFirst({
      where: {
        userId: userId,
        recipeId: recipeId
      }
    });
  
    if (!existingLike) {
      throw new Error("You haven't liked this recipe.");
    }
  
    await prisma.likes.delete({
      where: {
        id: existingLike.id 
      }
    });
  
  
    const updatedRecipe = await prisma.recipes.update({
      where: { id : recipeId },
      data: { likes_count: { decrement: 1 } },
      include: { likes: true } 
    });
  
    return updatedRecipe;
  },
  
  getPopularRecipes: async (orderBy) => {
    const recipe = await prisma.recipes.findMany({
      orderBy: {
        likes_count: "desc",
      },
    });
    return recipe;
  },
  getNewRecipes: async (orderBy) => {
    const recipe = await prisma.recipes.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return recipe;
  },
  getmylike: async (recipeId, userId) => {
    const recipe = await prisma.likes.findFirst({
      where : {
        recipeId : recipeId, 
        userId : userId
      }
    })
    return recipe
  }
  
};

const model = recipeModel;

export default model;
