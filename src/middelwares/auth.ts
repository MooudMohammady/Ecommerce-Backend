import jwt from "jsonwebtoken"
import createError from "http-errors"
import { Router } from "express"

const router = Router();

router.use(async(req, res, next) => {
    if (!req.headers.authorization) {
        return next(createError.Unauthorized('Access token is required'))
    }
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        return next(createError.Unauthorized())
    }
    try {
      const decoded = jwt.verify(token,process.env.JWT_SECRET!);
      //@ts-ignore
      req.userId = decoded.userId
      next()
    } catch (error : any) {
      next(createError.Unauthorized(error?.message))
    }
})

const auth = router;
export default auth