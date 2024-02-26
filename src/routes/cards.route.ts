import { Router } from "express";
import CartController from "../controllers/cards.controller";
import auth from "../middelwares/auth";

const router = Router();

router.get("/", auth, CartController.getCart);

router.post("/", auth, CartController.addToCart);

router.delete("/:cartItemId", auth, CartController.removeFromCart);

const cardRoute = router;
export default cardRoute;
