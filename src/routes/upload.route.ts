import { Router } from "express";
import UploadController from "../controllers/upload.controller";
import upload from "../lib/upload";
import authorAndAdminCheck from "../middlewares/adminCheck";

const router = Router();

router.post(
  "/",
  authorAndAdminCheck,
  upload.single("image"),
  UploadController.upload
);

const uploadRoute = router;
export default uploadRoute;

/**
 * @swagger
 * /upload:
 *  post:
 *    tags:
 *      - File
 *    description: Upload your images
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *       multipart/form-data:
 *         schema:
 *           type: object
 *           properties:
 *            image:
 *              type: string
 *              format: binary
 *    responses:
 *      200:
 *        description: Successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/File'
 */
