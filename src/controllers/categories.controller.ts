import { Request, Response } from "express";

import { db } from "../lib/db";

export default class CategoryController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const category = await db.category.findMany({
        include: {
          products: true,
        },
      });
      return res.json({
        data: category,
      });
    } catch (error: any) {
      console.log(error);
      res.send(error.message);
    }
  };
  static getSingle = async (req: Request, res: Response) => {
    try {
      const categoryId = req.params.id;
      const category = await db.category.findFirst({
        where: {
          id: categoryId,
        },
        include: {
          products: true,
        },
      });
      return res.json({
        data: category,
      });
    } catch (error: any) {
      console.log(error);
      res.send(error.message);
    }
  };
  static postSingle = async (req: Request, res: Response) => {
    try {
      const { title, description } = req.body;
      const category = await db.category.create({
        data: {
          title,
          description,
        },
      });
      return res.json({
        data: category,
      });
    } catch (error: any) {
      console.log(error);
      res.send(error.message);
    }
  };
  static putSingle = async (req: Request, res: Response) => {
    try {
      const { title, description } = req.body;

      const categoryId = req.params.id;

      let category = await db.category.findFirst({
        where: {
          id: categoryId,
        },
      });

      if (!category)
        return res
          .status(404)
          .send(`Category notfound with id : ${categoryId}`);

      category = await db.category.update({
        where: {
          id: categoryId,
        },
        data: {
          title,
          description,
        },
      });
      return res.json({
        data: category,
      });
    } catch (error: any) {
      console.log(error);
      res.send(error.message);
    }
  };
  static deleteSingle = async (req: Request, res: Response) => {
    try {
      const categoryId = req.params.id;

      let category = await db.category.findFirst({
        where: {
          id: categoryId,
        },
      });

      if (!category)
        return res
          .status(404)
          .send(`Category notfound with id : ${categoryId}`);

      category = await db.category.delete({
        where: {
          id: categoryId,
        },
      });
      return res.json({
        data: category,
      });
    } catch (error: any) {
      console.log(error);
      res.send(error.message);
    }
  };
}
