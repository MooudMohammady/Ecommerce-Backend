import { Router } from "express";
import CategoryController from "../controllers/category.controller";
import adminCheck from "../middlewares/adminCheck";

const router = Router();

router.get("/", CategoryController.getAll);

router.post("/", adminCheck, CategoryController.postSingle);

router.put("/:id", adminCheck, CategoryController.putSingle);

router.delete("/:id", adminCheck, CategoryController.deleteSingle);

const categoryRoute = router;
export default categoryRoute;
