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
router.post("/create", adminCheck_1.default, product_controller_1.default.postSingle);
router.put("/edit/:id", adminCheck_1.default, product_controller_1.default.putSingle);
router.delete("/remove/:id", adminCheck_1.default, product_controller_1.default.deleteSingle);
const productRoute = router;
exports.default = productRoute;
/**
 * @swagger
 * /products:
 *  get:
 *    tags:
 *      - Product
 *    description: Return all of products with querys parameters features
 *    parameters:
 *      - in: query
 *        name: q
 *        description: Search parameters in product fields like title
 *      - in: query
 *        name: page
 *        type: number
 *        description: Page of products for pagination. required limit !
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Limit of products for pagination. required page !
 *      - in: query
 *        name: sort
 *        description: 'Sort by fields of product. Example: title:asc,price:desc'
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
 *    description: Get single product by product id
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
 *                  example: 'Product not found by id : [productId]'
 * /products/create:
 *  post:
 *    tags:
 *      - Product
 *    description: Create new Product and return data of new product
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
 * /products/edit/{id}:
 *  put:
 *    tags:
 *      - Product
 *    description: Change details of product by product id
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
 *                  example: 'Product not found by id : [productId]'
 * /products/remove/{id}:
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
 *                  example: 'Product not found by id : [productId]'
 */
