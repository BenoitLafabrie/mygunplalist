import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const insertItemProps = async ({ grade, scale, series, itemId }) => {
  try {
    const itemProps = await prisma.itemProps.create({
      data: {
        grade,
        scale,
        series,
        itemId,
      },
      select: {
        id: true,
        grade: true,
        scale: true,
        series: true,
        itemId: true,
      },
    });
    return { status: 201, data: itemProps };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getAllItemProps = async () => {
  try {
    const getAllItemProps = await prisma.itemProps.findMany({
      select: {
        id: true,
        grade: true,
        scale: true,
        series: true,
        itemId: true,
      },
    });
    return { status: 200, data: getAllItemProps };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getItemPropsById = async (id) => {
  try {
    const getItemProps = await prisma.getItemProps.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!getItemProps) {
      return { status: 404, data: "Not Found" };
    }
    return { status: 200, data: getItemProps };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const updateItemProps = async (id, body) => {
  const { grade, scale, series, itemId } = body;
  try {
    const itemProps = await prisma.ItemProps.update({
      where: {
        id: parseInt(id),
      },
      data: {
        grade: grade,
        scale: scale,
        series: series,
        itemId: itemId,
      },
      select: {
        id: true,
        grade: true,
        scale: true,
        series: true,
        itemId: true,
      },
    });
    return { status: 200, data: itemProps };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const deleteItemProps = async (id) => {
  try {
    const itemProps = await prisma.ItemProps.delete({
      where: {
        id: parseInt(id),
      },
    });
    return { status: 200, data: itemProps };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

export {
  insertItemProps,
  updateItemProps,
  getAllItemProps,
  getItemPropsById,
  deleteItemProps,
};
