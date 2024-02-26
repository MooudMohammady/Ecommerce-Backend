import { Request, Response } from "express";

export default class UploadController {
  static upload = async (req: Request, res: Response) => {
    const locations = (req.files as any[]).map((f: any) => f.location);

    res.json({
      message: "uploaded",
      data: locations,
    });
  };
}
