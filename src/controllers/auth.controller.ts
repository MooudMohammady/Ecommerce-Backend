import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { db } from "../lib/db";
import { Request, Response } from "express";

export default class AuthController {
  static auth = async (req: Request, res: Response) => {
    const token = (req.cookies && req.cookies.token) || null;
    if (!token) {
      return res.status(404).json({
        message: "token notfound!",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
      };
      const user = await db.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) {
        throw new Error("user notfound");
      }

      return res.json({
        user,
      });
    } catch (error) {
      // Handle invalid token or other authentication failures
      console.error(error);
      return res.status(500).json({
        error,
      });
    }
  };

  static signIn = async (req: Request, res: Response) => {
    const { email, password } = await req.body;
    try {
      const expiryMinutes = 30 * 24 * 60;
      const user = await db.user.findFirstOrThrow({
        where: { email: email.toLowerCase().toString() },
      });
      if (!user) {
        return res.status(404).json({
          message: "user not founded",
        });
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.json({
          data: null,
          message: "invalid eamil or password",
        });
      }
      const token = jwt.sign(user.id, process.env.JWT_SECRET!);
      const tokenMaxAge = expiryMinutes * 60;

      return res
        .cookie("token", token, {
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV !== "development",
          maxAge: tokenMaxAge,
        })
        .cookie("logged-in", "true", {
          maxAge: tokenMaxAge,
        })
        .json({
          status: "success",
          id: user.id,
          token,
        });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  };

  static signUp = async (req: Request, res: Response) => {
    try {
      const { email, phone, password, name } = await req.body;
      const hashPassword = await bcrypt.hash(password, 2);

      const user = await db.user.findFirst({
        where: {
          email: email.toLowerCase().toString(),
        },
      });

      if (user) {
        return res.status(401).json({
          message: "user founded",
        });
      }

      await db.user.create({
        data: {
          email,
          phone,
          password: hashPassword,
          name,
        },
      });

      return res.json({
        message: "succses",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error,
      });
    }
  };

  static signOut = async (req: Request, res: Response) => {
    return res.clearCookie("token").clearCookie("logged-in").json({
      message: "now you are logout!",
    });
  };
}
