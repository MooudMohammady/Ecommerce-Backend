import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const router = Router();

router.get("/", AuthController.auth);

router.post("/sign-in", AuthController.signIn);

router.post("/sign-up", AuthController.signUp);

router.get("/sign-out", AuthController.signOut);

const authRoute = router;
export default authRoute;
