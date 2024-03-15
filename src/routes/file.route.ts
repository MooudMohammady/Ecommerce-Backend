import { Router } from "express";
import FileController from "../controllers/file.controller";
import authorAndAdminCheck from "../middlewares/adminCheck";

const router = Router();

router.get(
  "/",
  authorAndAdminCheck,
  FileController.getAll
);

const fileRoute = router;
export default fileRoute;

/**
 * @swagger
 * /files:
 *  get:
 *    tags:
 *      - File
 *    description: get all files by your id
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
 *                data:
 *                  type: array
 *                  example: ["https://URL_Of_Upload_host/yourfile"]
 */
