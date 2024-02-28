import { Router } from "express";
import CartController from "../controllers/cart.controller";
import auth from "../middlewares/auth";

const router = Router();

router.get("/", auth, CartController.getCart);

router.post("/", auth, CartController.addToCart);

router.delete("/:cartItemId", auth, CartController.removeFromCart);

const cartRoute = router;
export default cartRoute;
