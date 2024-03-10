"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cards_controller_1 = __importDefault(require("../controllers/cards.controller"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = (0, express_1.Router)();
router.get("/", auth_1.default, cards_controller_1.default.getCart);
router.post("/", auth_1.default, cards_controller_1.default.addToCart);
router.delete("/:cartItemId", auth_1.default, cards_controller_1.default.removeFromCart);
const cardRoute = router;
exports.default = cardRoute;
