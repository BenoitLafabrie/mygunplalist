import {
  insertUserAchievement,
  updateUserAchievement,
  getAllUserAchievements,
  getUserAchievementById,
  deleteUserAchievement,
} from "../models/UserAchievementManager.js";

const createUserAchievementController = async (req, res) => {
  const { status, data } = await insertUserAchievement({
    ...req.body,
    userId: req.payload.sub.id,
  });
  res.status(status).send(data);
};

const getAllUserAchievementsController = async (req, res) => {
  const { id } = req.payload.sub;
  const { status, data } = await getAllUserAchievements(parseInt(id));
  res.status(status).send(data);
};

const getOneUserAchievementController = async (req, res) => {
  const { status, data } = await getUserAchievementById(req.params.id);
  res.status(status).send(data);
};

const updateUserAchievementController = async (req, res) => {
  const { status, data } = await updateUserAchievement(req.params.id, req.body);
  res.status(status).send(data);
};

const deleteUserAchievementController = async (req, res) => {
  const { status, data } = await deleteUserAchievement(req.params.id);
  res.status(status).send(data);
};

export default {
  createUserAchievementController,
  getAllUserAchievementsController,
  getOneUserAchievementController,
  updateUserAchievementController,
  deleteUserAchievementController,
};
