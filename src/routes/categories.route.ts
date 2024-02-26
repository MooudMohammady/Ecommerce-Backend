import { Router } from "express";
import CategoryController from "../controllers/products.controller";
import auth from "../middelwares/auth";

const router = Router();

router.get("/", CategoryController.getAll);

router.post("/", auth, CategoryController.postSingle);

router.put("/:id", auth, CategoryController.putSingle);

router.delete("/:id", auth, CategoryController.deleteSingle);

const productsRoute = router;
export default productsRoute;
