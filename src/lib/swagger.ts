import { Router } from "express";
import * as swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const router = Router();

const swaggerDocs = swaggerJSDoc({
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Ecommerce",
      description: "simple node js ecommecrs api",
      contact: {
        name: "Mooud Mohammadi tabar",
        email: "MooudMohammadi@gmail.com",
      },
      version: "1.0.0",
    },
    tags: [{ name: "Auth" }],
  },
  apis: ["src/routes/*.ts","src/lib/swagger.ts"],
});
router.use(
  ["/openapi", "/docs", "/swagger"],
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocs)
);

const setupSwaggerRoute = router;
export default setupSwaggerRoute;


// Schemas
/** Authentication
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 * security:
 *  - bearerAuth: []
 */
/** User
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      properties:
 *        id:
 *          type: string
 *          readOnly: true
 *        name:
 *          type: string
 *        email:
 *          required: true
 *          type: string
 *          format: email
 *        phone:
 *          type: string
 *        password:
 *          type: string
 *          writeOnly: true
 *        Role:
 *          type: string
 *          default: PERSON
 *          enum: [PERSON,ADMIN,SUPER_ADMIN]
 *          readOnly: true
 *        Product:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Product'
 *          readOnly: true
 *      required:
 *        - email
 *        - password
 */
/** Product
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      properties:
 *        id:
 *          type: string
 *          readOnly: true
 *        title:
 *          type: string
 *        description:
 *          type: string
 *          nullable: true
 *        thumbnail:
 *          type: string
 *          nullable: true
 *        images:
 *          type: array
 *          items: 
 *             type: string
 *          nullable: true
 *        price:
 *          type: number
 *          format: float
 *          default: 100
 *        discount:
 *          type: number
 *          format: float
 *          default: 0
 *        stock:
 *          type: number
 *          default: 0
 *        isPhysical:
 *          type: boolean
 *          default: true
 *        isAvailable:
 *          type: boolean
 *          default: false
 *        isFeatured:
 *          type: boolean
 *          default: false
 *        category:
 *          type: string
 *          writeOnly: true
 *        user:
 *          type: object
 *          $ref: '#/components/schemas/User'
 *          readOnly: true
 *        categories:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Category'
 *          readOnly: true
 *        createdAt:
 *          type: string
 *          readOnly: true
 *        updatedAt:
 *          type: string
 *          readOnly: true
 *      required:
 *        - title
 */
/** Category
 * @swagger
 * components:
 *  schemas:
 *    Category:
 *      properties:
 *        id:
 *          type: string
 *          readOnly: true
 *        title:
 *          type: string
 *        description:
 *          type: string
 *          nullable: true
 *        products:
 *          type: array
 *          readOnly: true
 *          items:
 *            $ref: '#/components/schemas/Product'
 *        createdAt:
 *          type: string
 *          readOnly: true
 *        updatedAt:
 *          type: string
 *          readOnly: true
 *      required:
 *        - title
 */
/** File
 * @swagger
 * components:
 *  schemas:
 *    File:
 *      properties:
 *        id:
 *          type: string
 *          readOnly: true
 *        url:
 *          type: string
 *        userId:
 *          type: string
 *          readOnly: true
 *        createdAt:
 *          type: string
 *          readOnly: true
 *      required:
 *        - url
 */