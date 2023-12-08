import * as express from "express";
import wishlistsControllers from "../controllers/WishlistControllers.js";

const router = express.Router();

router.post("/", wishlistsControllers.createWishlistController);
router.get("/", wishlistsControllers.getAllWishlistsController);
router.get("/:id", wishlistsControllers.getOneWishlistController);
router.put("/:id", wishlistsControllers.updateWishlistController);
router.delete("/:id", wishlistsControllers.deleteWishlistController);

export default router;
