"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = __importDefault(require("../controllers/category.controller"));
const adminCheck_1 = __importDefault(require("../middlewares/adminCheck"));
const router = (0, express_1.Router)();
router.get("/", category_controller_1.default.getAll);
router.post("/", adminCheck_1.default, category_controller_1.default.postSingle);
router.put("/:id", adminCheck_1.default, category_controller_1.default.putSingle);
router.delete("/:id", adminCheck_1.default, category_controller_1.default.deleteSingle);
const categoryRoute = router;
exports.default = categoryRoute;
