import {
  insertItemProps,
  updateItemProps,
  getAllItemProps,
  getItemPropsById,
  deleteItemProps,
} from "../models/ItemPropsManager.js";

const createItemPropsController = async (req, res) => {
  const { status, data } = await insertItemProps({
    ...req.body,
    itemId: req.payload.sub.id,
  });
  res.status(status).send(data);
};

const getAllItemPropsController = async (req, res) => {
  const { id } = req.payload.sub;
  const { status, data } = await getAllItemProps(parseInt(id));
  res.status(status).send(data);
};

const getOneItemPropsController = async (req, res) => {
  const { status, data } = await getItemPropsById(req.params.id);
  res.status(status).send(data);
};

const updateItemPropsController = async (req, res) => {
  const { status, data } = await updateItemProps(req.params.id, req.body);
  res.status(status).send(data);
};

const deleteItemPropsController = async (req, res) => {
  const { status, data } = await deleteItemProps(req.params.id);
  res.status(status).send(data);
};

export default {
  createItemPropsController,
  getAllItemPropsController,
  getOneItemPropsController,
  updateItemPropsController,
  deleteItemPropsController,
};
