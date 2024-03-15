"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const file_controller_1 = __importDefault(require("../controllers/file.controller"));
const adminCheck_1 = __importDefault(require("../middlewares/adminCheck"));
const router = (0, express_1.Router)();
router.get("/", adminCheck_1.default, file_controller_1.default.getAll);
const fileRoute = router;
exports.default = fileRoute;
/**
 * @swagger
 * /files:
 *  get:
 *    tags:
 *      - File
 *    description: get all files by your id
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Successful
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  example: ["https://URL_Of_Upload_host/yourfile"]
 */
