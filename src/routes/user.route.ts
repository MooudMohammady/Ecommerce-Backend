import { Router } from "express";
import UserController from "../controllers/user.controller";
import AdminCheck from "../middlewares/adminCheck";

const router = Router();

router.patch("/change-role/:id",AdminCheck, UserController.changeRole);

const userRoute = router;
export default userRoute;

/**
 * @swagger
 * /users/change-role/{id}:
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
 */