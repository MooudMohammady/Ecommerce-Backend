"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = __importDefault(require("../controllers/products.controller"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = (0, express_1.Router)();
router.get("/", products_controller_1.default.getAll);
router.post("/", auth_1.default, products_controller_1.default.postSingle);
router.put("/:id", auth_1.default, products_controller_1.default.putSingle);
router.delete("/:id", auth_1.default, products_controller_1.default.deleteSingle);
const productsRoute = router;
exports.default = productsRoute;
