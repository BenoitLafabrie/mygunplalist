import {
  insertAchievementImage,
  updateAchievementImage,
  getAllAchievementImages,
  getAchievementImageById,
} from "../models/AchievementImageManager.js";

const createAchievementImageController = async (req, res) => {
  const { status, data } = await insertAchievementImage({
    ...req.body,
    achievementId: req.payload.sub.id,
  });
  res.status(status).send(data);
};

const getAllAchievementImagesController = async (req, res) => {
  const { id } = req.payload.sub;
  const { status, data } = await getAllAchievementImages(parseInt(id));
  res.status(status).send(data);
};

const getOneAchievementImageController = async (req, res) => {
  const { status, data } = await getAchievementImageById(req.params.id);
  res.status(status).send(data);
};

const updateAchievementImageController = async (req, res) => {
  const { status, data } = await updateAchievementImage(
    req.params.id,
    req.body
  );
  res.status(status).send(data);
};

export default {
  createAchievementImageController,
  getAllAchievementImagesController,
  getOneAchievementImageController,
  updateAchievementImageController,
};
