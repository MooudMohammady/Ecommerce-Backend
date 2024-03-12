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
router.get("/:id", category_controller_1.default.getSingle);
router.post("/create", adminCheck_1.default, category_controller_1.default.postSingle);
router.put("/edit/:id", adminCheck_1.default, category_controller_1.default.putSingle);
router.delete("/remove/:id", adminCheck_1.default, category_controller_1.default.deleteSingle);
const categoryRoute = router;
exports.default = categoryRoute;
/**
 * @swagger
 * /categories:
 *  get:
 *    tags:
 *      - Category
 *    description: Get products by category
 *    responses:
 *      200:
 *        description: Successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 * /categories/{id}:
 *  get:
 *    tags:
 *      - Category
 *    description: Get single category with products
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Category ID
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: 'Category not found by id : [categoryId]'
 * /categories/create:
 *  post:
 *    tags:
 *      - Category
 *    description: Create new Category and return data of new category
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Category'
 *    responses:
 *      200:
 *        description: Successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 * /categories/edit/{id}:
 *  put:
 *    tags:
 *      - Category
 *    description: Change details of category by category id
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Category ID
 *        required: true
 *        schema:
 *          type: string
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Category'
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
 *                  example: Category has successfuly changed.
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: 'Category not found by id : [categoryId]'
 * /categories/remove/{id}:
 *  delete:
 *    tags:
 *      - Category
 *    description: Delete category by category id
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Category ID
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
 *                  example: Category deleted successfuly.
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: 'Category not found by id : [categoryId]'
 */ 
