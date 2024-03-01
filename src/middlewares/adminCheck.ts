import jwt from "jsonwebtoken";
import createError from "http-errors";
import { Router } from "express";
import { db } from "../lib/db";

const router = Router();

router.use(async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(createError.Unauthorized("Access token is required"));
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(createError.Unauthorized());
  }
  try {
    const userId = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await db.user.findFirst({
      where: {
        id: userId as string,
      },
    });
    if (user?.Role !== "SUPER_ADMIN" && user?.Role !== "ADMIN")
      next(
        createError.Forbidden(
          "Access denied. You do not have permission to perform this action"
        )
      );
    //@ts-ignore
    req.userRole = user?.Role;
    //@ts-ignore
    req.userId = userId;
    next();
  } catch (error: any) {
    next(createError.Unauthorized(error?.message));
  }
});

const AdminCheck = router;
export default AdminCheck;
