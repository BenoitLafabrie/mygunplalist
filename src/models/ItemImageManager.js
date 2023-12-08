import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const insertItemImage = async ({ image_path, itemId }) => {
  try {
    const itemImage = await prisma.itemImage.create({
      data: {
        image_path,
        itemId,
      },
      select: {
        id: true,
        image_path: true,
        itemId: true,
      },
    });
    return { status: 201, data: itemImage };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getAllItemImages = async () => {
  try {
    const getAllItemImages = await prisma.itemImage.findMany({
      select: {
        id: true,
        image_path: true,
        itemId: true,
      },
    });
    return { status: 200, data: getAllItemImages };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getItemImageById = async (id) => {
  try {
    const getItemImage = await prisma.getItemImage.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!getItemImage) {
      return { status: 404, data: "Not Found" };
    }
    return { status: 200, data: getItemImage };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const updateItemImage = async (id, body) => {
  const { image_path, itemId } = body;
  try {
    const itemImage = await prisma.ItemImage.update({
      where: {
        id: parseInt(id),
      },
      data: {
        image_path: image_path,
        itemId: itemId,
      },
      select: {
        id: true,
        image_path: true,
        itemId: true,
      },
    });
    return { status: 200, data: itemImage };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const deleteItemImage = async (id) => {
  try {
    const itemImage = await prisma.ItemImage.delete({
      where: {
        id: parseInt(id),
      },
    });
    return { status: 200, data: itemImage };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

export {
  insertItemImage,
  updateItemImage,
  getAllItemImages,
  getItemImageById,
  deleteItemImage,
};
