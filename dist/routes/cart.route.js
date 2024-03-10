"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = __importDefault(require("../controllers/cart.controller"));
const adminCheck_1 = __importDefault(require("../middlewares/adminCheck"));
const router = (0, express_1.Router)();
router.get("/", adminCheck_1.default, cart_controller_1.default.getCart);
router.post("/", adminCheck_1.default, cart_controller_1.default.addToCart);
router.delete("/:cartItemId", adminCheck_1.default, cart_controller_1.default.removeFromCart);
const cartRoute = router;
exports.default = cartRoute;
