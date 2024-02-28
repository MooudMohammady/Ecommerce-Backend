import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { db } from "../lib/db";
import { Request, Response } from "express";
import getCookies from "../lib/getCookies";

function exclude<T, Key extends keyof T>(user: T, keys: Key[]): Omit<T, Key> {
  const result: any = {};
  for (const [key, value] of Object.entries(user!)) {
    if (!keys.includes(key as Key)) {
      result[key] = value;
    }
  }
  return result;
}

export default class AuthController {
  static auth = async (req: Request, res: Response) => {
    const token = getCookies(req)?.token || null;
    if (!token) {
      return res.status(404).json({
        message: "token notfound!",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
      };
      const user = await db.user.findFirst({
        where: { id: decoded.userId },
      });

      if (!user) {
        throw new Error("user notfound");
      }

      const userWithoutPassword = exclude(user!, ["password"]);
      return res.json(userWithoutPassword);
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
        return res.status(401).json({
          status: "failed",
          id: null,
          token: null,
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

      let user = await db.user.findFirst({
        where: {
          email: email.toLowerCase().toString(),
        },
      });

      if (user) {
        return res.status(401).json({
          message: "user founded",
        });
      }

      user = await db.user.create({
        data: {
          email,
          phone,
          password: hashPassword,
          name,
        },
      });

      return res.json(user);
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
