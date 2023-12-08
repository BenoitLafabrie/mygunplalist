import {
  insertMygunplalist,
  updateMygunplalist,
  deleteMygunplalist,
  getAllMygunplalists,
  getMygunplalistById,
} from "../models/MyGunplalistManager.js";

const createMyGunplalistController = async (req, res) => {
  const { status, data } = await insertMygunplalist({
    ...req.body,
    itemId: req.payload.sub.id,
    userId: req.body.userId,
  });
  res.status(status).send(data);
};

const getAllMyGunplalistsController = async (req, res) => {
  const { id } = req.payload.sub;
  const { status, data } = await getAllMygunplalists(parseInt(id));
  res.status(status).send(data);
};

const getOneMyGunplalistController = async (req, res) => {
  const { status, data } = await getMygunplalistById(req.params.id);
  res.status(status).send(data);
};

const updateMyGunplalistController = async (req, res) => {
  const { status, data } = await updateMygunplalist(req.params.id, req.body);
  res.status(status).send(data);
};

const deleteMyGunplalistController = async (req, res) => {
  const { status, data } = await deleteMygunplalist(req.params.id);
  res.status(status).send(data);
};

export default {
  createMyGunplalistController,
  getAllMyGunplalistsController,
  getOneMyGunplalistController,
  updateMyGunplalistController,
  deleteMyGunplalistController,
};
