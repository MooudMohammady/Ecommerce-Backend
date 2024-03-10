"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_controller_1 = __importDefault(require("../controllers/upload.controller"));
const upload_1 = __importDefault(require("../lib/upload"));
const adminCheck_1 = __importDefault(require("../middlewares/adminCheck"));
const router = (0, express_1.Router)();
router.post("/", adminCheck_1.default, upload_1.default.single("image"), upload_controller_1.default.upload);
const uploadRoute = router;
exports.default = uploadRoute;
/**
 * @swagger
 * /upload:
 *  post:
 *    tags:
 *      - File
 *    description: Upload your images
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *       multipart/form-data:
 *         schema:
 *           type: object
 *           properties:
 *            image:
 *              type: string
 *              format: binary
 *    responses:
 *      200:
 *        description: Successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/File'
 */
