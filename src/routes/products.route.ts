import { Router } from "express";
import ProductsController from "../controllers/products.controller";
import auth from "../middelwares/auth";

const router = Router();

router.get("/", ProductsController.getAll);

router.post("/",auth, ProductsController.postSingle);

router.put("/:id",auth, ProductsController.putSingle);

router.delete("/:id",auth, ProductsController.deleteSingle);

const productsRoute = router;
export default productsRoute;
