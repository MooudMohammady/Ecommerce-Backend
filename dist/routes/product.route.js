"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const adminCheck_1 = __importDefault(require("../middlewares/adminCheck"));
const router = (0, express_1.Router)();
router.get("/", product_controller_1.default.getAll);
router.get("/:id", product_controller_1.default.getSingle);
router.post("/post", adminCheck_1.default, product_controller_1.default.postSingle);
router.put("/put/:id", adminCheck_1.default, product_controller_1.default.putSingle);
router.delete("/delete/:id", adminCheck_1.default, product_controller_1.default.deleteSingle);
const productRoute = router;
exports.default = productRoute;
/**
 * @swagger
 * /products:
 *  get:
 *    tags:
 *      - Product
 *    description: Change details of current product and return your new profile details
 *    responses:
 *      200:
 *        description: Successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 * /products/{id}:
 *  get:
 *    tags:
 *      - Product
 *    description: Get single product
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Product ID
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: product not found
 * /products/post:
 *  post:
 *    tags:
 *      - Product
 *    description: Change details of current product and return your new profile details
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        description: Successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 * /products/put/{id}:
 *  put:
 *    tags:
 *      - Product
 *    description: Change passowrd of product
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Product ID
 *        required: true
 *        schema:
 *          type: string
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        description: Successful
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Product has successfuly changed.
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: product not found
 * /products/delete/{id}:
 *  delete:
 *    tags:
 *      - Product
 *    description: Delete product by product id
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Product ID
 *        required: true
 *        schema:
 *          type: string
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
 *                message:
 *                  type: string
 *                  example: Product deleted successfuly.
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: product not found
 */
