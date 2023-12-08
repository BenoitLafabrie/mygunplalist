import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const insertWishlist = async ({ wishlist_id, userId, itemId }) => {
  try {
    const wishlist = await prisma.wishlist.create({
      data: {
        wishlist_id,
        userId,
        itemId,
      },
      select: {
        id: true,
        wishlist_id: true,
        userId: true,
        itemId: true,
      },
    });
    return { status: 201, data: wishlist };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getAllWishlists = async () => {
  try {
    const getAllWishlists = await prisma.wishlist.findMany({
      select: {
        id: true,
        wishlist_id: true,
        userId: true,
        itemId: true,
      },
    });
    return { status: 200, data: getAllWishlists };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getWishlistById = async (id) => {
  try {
    const getWishlist = await prisma.Wishlist.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!getWishlist) {
      return { status: 404, data: "Not Found" };
    }
    return { status: 200, data: getWishlist };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const updateWishlist = async (id, body) => {
  const { wishlist_id, userId, itemId } = body;
  try {
    const wishlist = await prisma.wishlist.update({
      where: {
        id: parseInt(id),
      },
      data: {
        wishlist_id: wishlist_id,
        userId: userId,
        itemId: itemId,
      },
      select: {
        id: true,
        wishlist_id: true,
        userId: true,
        itemId: true,
      },
    });
    return { status: 200, data: wishlist };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const deleteWishlist = async (id) => {
  try {
    const wishlist = await prisma.wishlist.delete({
      where: {
        id: parseInt(id),
      },
    });
    return { status: 200, data: wishlist };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

export {
  insertWishlist,
  updateWishlist,
  deleteWishlist,
  getAllWishlists,
  getWishlistById,
};
