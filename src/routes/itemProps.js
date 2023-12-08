import * as express from "express";
import itemPropsControllers from "../controllers/ItemPropsControllers.js";

const router = express.Router();

router.post("/", itemPropsControllers.createItemPropsController);
router.get("/", itemPropsControllers.getAllItemPropsController);
router.get("/:id", itemPropsControllers.getOneItemPropsController);
router.put("/:id", itemPropsControllers.updateItemPropsController);
router.delete("/:id", itemPropsControllers.deleteItemPropsController);

export default router;
