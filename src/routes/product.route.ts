import { Router } from "express";
import ProductController from "../controllers/product.controller";
import auth from "../middlewares/auth";

const router = Router();

router.get("/", ProductController.getAll);

router.post("/", auth, ProductController.postSingle);

router.put("/:id", auth, ProductController.putSingle);

router.delete("/:id", auth, ProductController.deleteSingle);

const productRoute = router;
export default productRoute;
