import { Router } from "express";
import ProductController from "../controllers/product.controller";
import adminCheck from "../middlewares/adminCheck";

const router = Router();

router.get("/", ProductController.getAll);

router.get("/:id", ProductController.getSingle);

router.post("/", adminCheck, ProductController.postSingle);

router.put("/:id", adminCheck, ProductController.putSingle);

router.delete("/:id", adminCheck, ProductController.deleteSingle);

const productRoute = router;
export default productRoute;
