"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const swaggerUI = __importStar(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const router = (0, express_1.Router)();
const swaggerDocs = (0, swagger_jsdoc_1.default)({
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
    apis: ["src/routes/*.ts", "src/lib/swagger.ts"],
});
router.use(["/openapi", "/docs", "/swagger"], swaggerUI.serve, swaggerUI.setup(swaggerDocs));
const setupSwaggerRoute = router;
exports.default = setupSwaggerRoute;
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
