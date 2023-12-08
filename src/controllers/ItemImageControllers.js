import {
  insertItemImage,
  insertManyItemImages,
  updateItemImage,
  getAllItemImages,
  getItemImageById,
  deleteItemImage,
} from "../models/ItemImageManager.js";

const createItemImageController = async (req, res) => {
  const { status, data } = await insertItemImage({
    ...req.body,
    itemId: req.payload.sub.id,
  });
  res.status(status).send(data);
};

const createManyItemImagesController = async (req, res) => {
  const { status, data } = await insertManyItemImages({
    ...req.body,
    itemId: req.payload.sub.id,
  });
  res.status(status).send(data);
};

const createItemImagesController = async (req, res, next) => {
  if (Array.isArray(req.body)) {
    return createManyItemImagesController(req, res, next);
  } else {
    return createItemImageController(req, res, next);
  }
};

const getAllItemImagesController = async (req, res) => {
  const { id } = req.payload.sub;
  const { status, data } = await getAllItemImages(parseInt(id));
  res.status(status).send(data);
};

const getOneItemImageController = async (req, res) => {
  const { status, data } = await getItemImageById(req.params.id);
  res.status(status).send(data);
};

const updateItemImageController = async (req, res) => {
  const { status, data } = await updateItemImage(req.params.id, req.body);
  res.status(status).send(data);
};

const deleteItemImageController = async (req, res) => {
  const { status, data } = await deleteItemImage(req.params.id);
  res.status(status).send(data);
};

export default {
  createItemImagesController,
  getAllItemImagesController,
  getOneItemImageController,
  updateItemImageController,
  deleteItemImageController,
};
