import { Request, Response } from "express";
import { db } from "../lib/db";

export default class UploadController {
  static upload = async (req: Request, res: Response) => {
    const file = await db.file.create({
      data: {
        //@ts-ignore
        userId: req.userId,
        //@ts-ignore
        url: req.file!.location,
      },
    });

    res.json({
      message: "uploaded",
      data: file,
    });
  };
}
