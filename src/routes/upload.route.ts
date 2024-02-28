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
