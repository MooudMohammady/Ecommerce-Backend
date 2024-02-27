import { Router } from "express";
import UploadController from "../controllers/upload.controller";
import auth from "../middlewares/auth";
import upload from "../lib/upload";

const router = Router();

router.post("/", auth, upload.single("image"), UploadController.upload);

const uploadRoute = router;
export default uploadRoute;
