"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const adminCheck_1 = __importDefault(require("../middlewares/adminCheck"));
const router = (0, express_1.Router)();
router.put("/", user_controller_1.default.update);
router.patch("/forgot-password/:id", user_controller_1.default.forgotPassword);
router.patch("/change-role/:id", adminCheck_1.default, user_controller_1.default.changeRole);
router.delete("/delete/:id", adminCheck_1.default, user_controller_1.default.deleteUser);
const userRoute = router;
exports.default = userRoute;
/**
 * @swagger
 * /user:
 *  put:
 *    tags:
 *      - User
 *    description: Change details of current user and return your new profile details
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: YourNewName
 *              email:
 *                type: string
 *                format: email
 *              phone:
 *                type: string
 *                example: YourNewPhone
 *    responses:
 *      200:
 *        description: Successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      401:
 *        description: Email already exists
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Email already exists !
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: user not found
 * /user/change-role/{id}:
 *  patch:
 *    tags:
 *      - User
 *    description: Change role of user with id and return your profile details
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        description: User ID
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              role:
 *                type: string
 *                enum: ["PERSON","AUTHOR","ADMIN","SUPER_ADMIN"]
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
 *                  example: user not found
 * /user/forgot-passowrd/{id}:
 *  patch:
 *    tags:
 *      - User
 *    description: Change passowrd of user
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              passowrd:
 *                type: string
 *                example: NewPassword
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
 *                  example: Password has successfuly changed.
 *      401:
 *        description: Invalid password
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Invalid password
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: user not found
 * /user/delete/{id}:
 *  delete:
 *    tags:
 *      - User
 *    description: Delete user acount
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
 *                  example: User deleted successfuly.
 *      403:
 *        description: When you are not SUPER ADMIN
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: You are not SUPER ADMIN
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: user not found
 */
