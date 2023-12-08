import * as express from "express";
import myGunplalistsControllers from "../controllers/MyGunplalistControllers.js";

const router = express.Router();

router.post("/", myGunplalistsControllers.createMyGunplalistController);
router.get("/", myGunplalistsControllers.getAllMyGunplalistsController);
router.get("/:id", myGunplalistsControllers.getOneMyGunplalistController);
router.put("/:id", myGunplalistsControllers.updateMyGunplalistController);
router.delete("/:id", myGunplalistsControllers.deleteMyGunplalistController);

export default router;
