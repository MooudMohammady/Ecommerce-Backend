import { Request, Response } from "express";
import { db } from "../lib/db";

export default class UploadController {
  static getAll = async (req: Request, res: Response) => {
    try {
      //@ts-ignore
      const userId = req.userId;

      const files = await db.file.findMany({
        where: {
          userId,
        },
      });

      res.json({
        data: files.flatMap(files=>files.url),
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  };
}
