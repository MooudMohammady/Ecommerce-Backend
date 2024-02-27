import { Router } from "express";
import OrderController from "../controllers/order.controller";

const router = Router();

router.get("/", OrderController.getAll); // GET /orders
router.get("/:id", OrderController.getSingle); // GET /orders/:id
router.post("/", OrderController.createOrder); // POST /orders
router.delete("/:id", OrderController.deleteOrder); // DELETE /orders/:id

const orderRoute = router;
export default orderRoute;
