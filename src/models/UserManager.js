import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const insertUser = async ({
  username,
  firstname,
  lastname,
  email,
  birthDate,
  password,
}) => {
  try {
    const user = await prisma.users.create({
      data: {
        username,
        firstname,
        lastname,
        email,
        birthDate,
        password,
      },
      select: {
        id: true,
        username,
        firstname: true,
        lastname: true,
        email: true,
        birthDate: true,
      },
    });
    return { status: 201, data: user };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getAllUsers = async () => {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        username: true,
        firstname: true,
        lastname: true,
        email: true,
        birthDate: true,
      },
    });
    return { status: 200, data: users };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getUserById = async (id) => {
  try {
    const getUser = await prisma.users.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!getUser) {
      return { status: 404, data: "Not Found" };
    }
    return { status: 200, data: getUser };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const updateUser = async (id, body) => {
  const { username, firstname, lastname, email, birthDate } = body;
  try {
    const user = await prisma.users.update({
      where: {
        id: parseInt(id),
      },
      data: {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        birthDate: birthDate,
      },
      select: {
        id: true,
        username: true,
        firstname: true,
        lastname: true,
        email: true,
        birthDate: true,
      },
    });
    return { status: 200, data: user };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

export { insertUser, updateUser, getAllUsers, getUserById };
