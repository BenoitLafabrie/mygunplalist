import {
  insertUserImage,
  updateUserImage,
  getAllUserImages,
  getUserImageById,
  deleteUserImage,
} from "../models/UserImageManager.js";

const createUserImageController = async (req, res) => {
  const { status, data } = await insertUserImage({
    ...req.body,
    userId: req.payload.sub.id,
  });
  res.status(status).send(data);
};

const getAllUserImagesController = async (req, res) => {
  const { id } = req.payload.sub;
  const { status, data } = await getAllUserImages(parseInt(id));
  res.status(status).send(data);
};

const getOneUserImageController = async (req, res) => {
  const { status, data } = await getUserImageById(req.params.id);
  res.status(status).send(data);
};

const updateUserImageController = async (req, res) => {
  const { status, data } = await updateUserImage(req.params.id, req.body);
  res.status(status).send(data);
};

const deleteUserImageController = async (req, res) => {
  const { status, data } = await deleteUserImage(req.params.id);
  res.status(status).send(data);
};

export default {
  createUserImageController,
  getAllUserImagesController,
  getOneUserImageController,
  updateUserImageController,
  deleteUserImageController,
};
