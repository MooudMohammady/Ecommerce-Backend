import { Router } from "express";
import UploadController from "../controllers/upload.controller";
import auth from "../middelwares/auth";
import upload from "../lib/upload";

const router = Router();

router.post("/", auth, upload.array("images"), UploadController.upload);

const uploadRoute = router;
export default uploadRoute;
