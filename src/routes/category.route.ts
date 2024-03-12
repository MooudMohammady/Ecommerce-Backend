import { Router } from "express";
import CategoryController from "../controllers/category.controller";
import adminCheck from "../middlewares/adminCheck";

const router = Router();

router.get("/", CategoryController.getAll);

router.get("/:id", CategoryController.getSingle);

router.post("/create", adminCheck, CategoryController.postSingle);

router.put("/edit/:id", adminCheck, CategoryController.putSingle);

router.delete("/remove/:id", adminCheck, CategoryController.deleteSingle);

const categoryRoute = router;
export default categoryRoute;

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