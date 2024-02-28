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
    servers: [
      {
        url: "http://localhost:3040",
      },
    ],
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

/**
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
 *        Product:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Product'
 *          readOnly: true
 *      required:
 *        - email
 *        - password
 *    Product:
 *      properties:
 *        id:
 *          type: string
 *          readOnly: true
 *        title:
 *          type: string
 *        description:
 *          type: string
 *        thumbnail:
 *          type: string
 *        images:
 *          type: array
 *          items: 
 *             type: string
 *        price:
 *          type: number
 *          format: float
 *        discount:
 *          type: number
 *          format: float
 *        stock:
 *          type: number
 */
