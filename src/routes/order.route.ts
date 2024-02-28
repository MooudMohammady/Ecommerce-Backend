import { Router } from "express";
import OrderController from "../controllers/order.controller";
import adminCheck from "../middlewares/adminCheck";

const router = Router();

router.get("/", OrderController.getAll); // GET /orders
router.get("/:id", OrderController.getSingle); // GET /orders/:id
router.post("/", adminCheck, OrderController.createOrder); // POST /orders
router.delete("/:id", adminCheck, OrderController.deleteOrder); // DELETE /orders/:id

const orderRoute = router;
export default orderRoute;
