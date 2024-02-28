import { Router } from "express";
import CartController from "../controllers/cart.controller";
import adminCheck from "../middlewares/adminCheck";

const router = Router();

router.get("/", adminCheck, CartController.getCart);

router.post("/", adminCheck, CartController.addToCart);

router.delete("/:cartItemId", adminCheck, CartController.removeFromCart);

const cartRoute = router;
export default cartRoute;
