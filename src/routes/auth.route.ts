import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const router = Router();
router.get("/", AuthController.auth);

router.post("/sign-in", AuthController.signIn);

router.post("/sign-up", AuthController.signUp);

router.get("/sign-out", AuthController.signOut);

const authRoute = router;
export default authRoute;
/**
 * @swagger
 * /auth:
 *  get:
 *    tags:
 *      - Auth
 *    description: return your profile details
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
 *    description : login for get token
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
 *              token: a21j0jsdfjjalsfasf78sdahfavnlkjenerunvi
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
 */
