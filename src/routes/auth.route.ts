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
 */