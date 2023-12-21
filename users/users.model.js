import prisma from "../src/db.js";

const userModel = {
  getAllUsers: async () => {
    const user = await prisma.users.findMany({
      select: {
        name: true,
        username: true,
        image: true,
      },
      orderBy: [
        {
          name: "desc",
        },
        {
          username: "desc",
        },
        {
          image: "desc",
        },
      ],
    });
    return user;
  },
  getUsersById: async (id) => {
    if (typeof id !== "number") {
      throw Error("ID is not a number");
    }
    const user = await prisma.users.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw Error("User not found");
    }
    return user;
  },
  postLogin: async (email) => {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    return user;
  },
  postUsers: async (usersData) => {
    const user = await prisma.users.create({
      data: {
        email: usersData.email,
        password: usersData.password,
        name: usersData.name,
        username: usersData.username,
        phone: usersData.phone,
        image: usersData.image,
      },
    });
    return user;
  },
  registerUsers: async (userData) => {
    const user = await prisma.users.create({
      data: {
        email: userData.email,
        name: userData.name,
        username: userData.username,
        password: userData.password,
        phone: userData.phone,
      },
    });
    return user;
  },

  updateAllDataUsers: async (id, usersData) => {
    if (!(usersData.email && usersData.password && usersData.name && usersData.username && usersData.phone && usersData.username && usersData.Role)) {
      throw Error("some field are empty");
    }
    const user = await prisma.users.update({
      where: {
        id,
      },
      data: {
        email: usersData.email,
        password: usersData.password,
        name: usersData.name,
        username: usersData.username,
        phone: usersData.phone,
        image: usersData.image,
      },
    });
    return user;
  },
  updateDataUsers: async (id, usersData) => {
    const user = await prisma.users.update({
      where: {
        id,
      },
      data: {
        email: usersData.email,
        password: usersData.password,
        name: usersData.name,
        username: usersData.username,
        phone: usersData.phone,
        image: usersData.image,
      },
    });
    return user;
  },
  deleteUsers: async (id) => {
    if (typeof id !== "number") {
      throw Error("ID is not a number");
    }
    const user = await prisma.users.delete({
      where: {
        id,
      },
    });
    return user;
  },
};

export default userModel;
