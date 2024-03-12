import { Router } from "express";
import CategoryController from "../controllers/category.controller";
import adminCheck from "../middlewares/adminCheck";

const router = Router();

router.get("/", CategoryController.getAll);

router.post("/create", adminCheck, CategoryController.postSingle);

router.put("/edit/:id", adminCheck, CategoryController.putSingle);

router.delete("/remove/:id", adminCheck, CategoryController.deleteSingle);

const categoryRoute = router;
export default categoryRoute;
