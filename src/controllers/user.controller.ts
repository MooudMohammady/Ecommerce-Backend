import { Request, Response } from "express";
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
}
