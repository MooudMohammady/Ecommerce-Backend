import { Router } from "express";
import CategoryController from "../controllers/category.controller";
import auth from "../middlewares/auth";

const router = Router();

router.get("/", CategoryController.getAll);

router.post("/", auth, CategoryController.postSingle);

router.put("/:id", auth, CategoryController.putSingle);

router.delete("/:id", auth, CategoryController.deleteSingle);

const categoryRoute = router;
export default categoryRoute;
