import { Router } from "express";
import UserController from "../controllers/user.controller";

const router = Router();

router.patch("/change-role/:id", UserController.changeRole);

const userRoute = router;
export default userRoute;