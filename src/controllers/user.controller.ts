import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../lib/db";
import { Role } from "@prisma/client";
import exclude from "../lib/exclude";

export default class UserController {
  static async changeRole(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const Role = (await req.body.role) as Role;

      let user = await db.user.findFirstOrThrow({
        where: { id: userId },
      });
      if (!user) {
        return res.status(404).json({
          message: "user not founded",
        });
      }
      //@ts-ignore
      if (req.userRole !== "SUPER_ADMIN") {
        return res.status(403).json({
          message: "You are not SUPER ADMIN",
        });
      }

      user = await db.user.update({
        where: {
          id: userId,
        },
        data: {
          Role,
        },
      });

      const excludedUser = exclude(user!, ["password"]);

      return res.json(excludedUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error,
      });
    }
  }
  static async changePassword(req: Request, res: Response) {
    try {
      //@ts-ignore
      const userId = req.userId;
      const { newPassword, password } = await req.body;

      let user = await db.user.findFirstOrThrow({
        where: { id: userId },
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
          message: "Invalid password",
        });
      }

      const hashNewPassword = await bcrypt.hash(newPassword, 2);

      await db.user.update({
        where: {
          id: userId,
        },
        data: {
          password: hashNewPassword,
        },
      });

      return res.json({
        status: "Success",
        message: "Password has successfuly changed.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error,
      });
    }
  }
  static async update(req: Request, res: Response) {
    try {
      //@ts-ignore
      const userId = req.userId;
      const { email, phone, name } = await req.body;

      let user = await db.user.findFirstOrThrow({
        where: { id: userId },
      });
      if (!user) {
        return res.status(404).json({
          message: "user not founded",
        });
      }

      let user2 = await db.user.findFirst({
        where: { email },
      });
      if(user2){
        return res.status(401).json({
          message:"Email already exists !"
        })
      }

      user = await db.user.update({
        where: {
          id: userId,
        },
        data: {
          email,
          phone,
          name,
        },
      });

      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error,
      });
    }
  }
}
