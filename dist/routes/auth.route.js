"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const router = (0, express_1.Router)();
router.get("/", auth_controller_1.default.auth);
router.post("/sign-in", auth_controller_1.default.signIn);
router.post("/sign-up", auth_controller_1.default.signUp);
router.delete("/sign-out", auth_controller_1.default.signOut);
router.post("/refresh", auth_controller_1.default.refresh);
const authRoute = router;
exports.default = authRoute;
/**
 * @swagger
 * /auth:
 *  get:
 *    tags:
 *      - Auth
 *    description: return your profile details
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: token notfound!
 * /auth/sign-in:
 *  post:
 *    tags:
 *      - Auth
 *    description : login for get tokens
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: Successful
 *        content:
 *          application/json:
 *            example:
 *              status: success
 *              id: cs23fasfduhasipfu
 *              refresh: a21j0jsdfjjalsfasf78sdahfavnlkjenerunvi
 *              access: a21jsafdsafdfasfas8sdahfavnlkjenerunvi
 *      401:
 *        description: Invalid password or email
 *        content:
 *          application/json:
 *            example:
 *              status: failed
 *              id: null
 *              token: null
 *              message: invalid eamil or password
 *      404:
 *        description: User not founded
 *        content:
 *          application/json:
 *            example:
 *              message: user not founded
 * /auth/sign-up:
 *  post:
 *    tags:
 *      - Auth
 *    description : register your account
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: Successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      401:
 *        description: User founded
 *        content:
 *          application/json:
 *            example:
 *              message: user founded
 * /auth/sign-out:
 *  delete:
 *    tags:
 *      - Auth
 *    description: logout from your account
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              refresh:
 *                type: string
 *    responses:
 *      200:
 *        description: Successful
 *        content:
 *          application/json:
 *            example:
 *              message: now you are logout!
 * /auth/refresh:
 *  post:
 *    tags:
 *      - Auth
 *    description : get access token by refresh token
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              refresh:
 *                type: string
 *    responses:
 *      200:
 *        description: Successful
 *        content:
 *          application/json:
 *            example:
 *              access: a21j0jsdfjjalsfasf78sdahfavnlkjenerunvi
 *      401:
 *        description: Invalid Refresh token
 *        content:
 *          application/json:
 *            example:
 *              status: failed
 *              id: null
 *              token: null
 *              message: Refresh token invalid
 *      404:
 *        description: refresh token not founded
 *        content:
 *          application/json:
 *            example:
 *              message: refresh token not founded

 */
