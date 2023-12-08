import {
  insertFriend,
  updateFriend,
  getAllFriends,
  getFriendById,
  deleteFriend,
} from "../models/FriendManager.js";

const createFriendController = async (req, res) => {
  const { status, data } = await insertFriend({
    ...req.body,
    userId: req.payload.sub.id,
  });
  res.status(status).send(data);
};

const getAllFriendsController = async (req, res) => {
  const { id } = req.payload.sub;
  const { status, data } = await getAllFriends(parseInt(id));
  res.status(status).send(data);
};

const getOneFriendController = async (req, res) => {
  const { status, data } = await getFriendById(req.params.id);
  res.status(status).send(data);
};

const updateFriendController = async (req, res) => {
  const { status, data } = await updateFriend(req.params.id, req.body);
  res.status(status).send(data);
};

const deleteFriendController = async (req, res) => {
  const { status, data } = await deleteFriend(req.params.id);
  res.status(status).send(data);
};

export default {
  createFriendController,
  getAllFriendsController,
  getOneFriendController,
  updateFriendController,
  deleteFriendController,
};
