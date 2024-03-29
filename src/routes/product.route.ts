import { Router } from "express";
import ProductController from "../controllers/product.controller";
import adminCheck from "../middlewares/adminCheck";

const router = Router();

router.get("/", ProductController.getAll);

router.get("/:id", ProductController.getSingle);

router.post("/create", adminCheck, ProductController.postSingle);

router.put("/edit/:id", adminCheck, ProductController.putSingle);

router.delete("/remove/:id", adminCheck, ProductController.deleteSingle);

const productRoute = router;
export default productRoute;

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
