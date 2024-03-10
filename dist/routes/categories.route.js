"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_controller_1 = __importDefault(require("../controllers/categories.controller"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = (0, express_1.Router)();
router.get("/", categories_controller_1.default.getAll);
router.post("/", auth_1.default, categories_controller_1.default.postSingle);
router.put("/:id", auth_1.default, categories_controller_1.default.putSingle);
router.delete("/:id", auth_1.default, categories_controller_1.default.deleteSingle);
const categoriesRoute = router;
exports.default = categoriesRoute;
