"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = __importDefault(require("../controllers/order.controller"));
const adminCheck_1 = __importDefault(require("../middlewares/adminCheck"));
const router = (0, express_1.Router)();
router.get("/", order_controller_1.default.getAll); // GET /orders
router.get("/:id", order_controller_1.default.getSingle); // GET /orders/:id
router.post("/", adminCheck_1.default, order_controller_1.default.createOrder); // POST /orders
router.delete("/:id", adminCheck_1.default, order_controller_1.default.deleteOrder); // DELETE /orders/:id
const orderRoute = router;
exports.default = orderRoute;
