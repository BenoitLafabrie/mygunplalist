import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const insertMygunplalist = async ({ barcode, itemId, userId }) => {
  try {
    const mygunplalist = await prisma.mygunplalist.create({
      data: {
        barcode,
        itemId,
        userId,
      },
      select: {
        id: true,
        barcode: true,
        itemId: true,
        userId: true,
      },
    });
    return { status: 201, data: mygunplalist };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const insertManyGunplalists = async (items) => {
  try {
    const result = await prisma.items.createMany({
      data: items.map((item) => ({
        barcode: item.barcode,
        itemId: item.itemId,
        userId: item.userId,
      })),
    });
    return { status: 201, data: result };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getAllMygunplalists = async () => {
  try {
    const getAllMygunplalists = await prisma.mygunplalist.findMany({
      select: {
        id: true,
        barcode: true,
        itemId: true,
        userId: true,
      },
    });
    return { status: 200, data: getAllMygunplalists };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getMygunplalistById = async (id) => {
  try {
    const getMygunplalist = await prisma.getMygunplalist.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!getMygunplalist) {
      return { status: 404, data: "Not Found" };
    }
    return { status: 200, data: getMygunplalist };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const updateMygunplalist = async (id, body) => {
  const { barcode, itemId, userId } = body;
  try {
    const mygunplalist = await prisma.Mygunplalist.update({
      where: {
        id: parseInt(id),
      },
      data: {
        barcode: barcode,
        itemId: itemId,
        userId: userId,
      },
      select: {
        id: true,
        barcode: true,
        itemId: true,
        userId: true,
      },
    });
    return { status: 200, data: mygunplalist };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const deleteMygunplalist = async (id) => {
  try {
    const myGunplaList = await prisma.mygunplalist.delete({
      where: {
        id: parseInt(id),
      },
    });
    return { status: 200, data: myGunplaList };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

export {
  insertMygunplalist,
  insertManyGunplalists,
  updateMygunplalist,
  deleteMygunplalist,
  getAllMygunplalists,
  getMygunplalistById,
};
