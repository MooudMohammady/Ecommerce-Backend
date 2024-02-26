import { Router } from "express";
import CategoriesController from "../controllers/categories.controller";
import auth from "../middelwares/auth";

const router = Router();

router.get("/", CategoriesController.getAll);

router.post("/", auth, CategoriesController.postSingle);

router.put("/:id", auth, CategoriesController.putSingle);

router.delete("/:id", auth, CategoriesController.deleteSingle);

const categoriesRoute = router;
export default categoriesRoute;
