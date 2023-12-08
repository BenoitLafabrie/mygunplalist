import {
  insertItemImage,
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
  createItemImageController,
  getAllItemImagesController,
  getOneItemImageController,
  updateItemImageController,
  deleteItemImageController,
};
