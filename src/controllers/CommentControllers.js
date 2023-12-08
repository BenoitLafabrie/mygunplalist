import {
  insertComment,
  updateComment,
  getAllComments,
  getCommentById,
  deleteComment,
} from "../models/CommentManager.js";

const createCommentController = async (req, res) => {
  const { status, data } = await insertComment({
    ...req.body,
    userId: req.payload.sub.id,
  });
  res.status(status).send(data);
};

const getAllCommentsController = async (req, res) => {
  const { id } = req.payload.sub;
  const { status, data } = await getAllComments(parseInt(id));
  res.status(status).send(data);
};

const getOneCommentController = async (req, res) => {
  const { status, data } = await getCommentById(req.params.id);
  res.status(status).send(data);
};

const updateCommentController = async (req, res) => {
  const { status, data } = await updateComment(req.params.id, req.body);
  res.status(status).send(data);
};

const deleteCommentController = async (req, res) => {
  const { status, data } = await deleteComment(req.params.id);
  res.status(status).send(data);
};

export default {
  createCommentController,
  getAllCommentsController,
  getOneCommentController,
  updateCommentController,
  deleteCommentController,
};
