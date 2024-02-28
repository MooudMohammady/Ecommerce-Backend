import { Request, Response } from "express";

import { db } from "../lib/db";

export default class ProductController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const products = await db.product.findMany();
      return res.json({
        data: products,
      });
    } catch (error: any) {
      console.log(error);
      res.send(error.message);
    }
  };
  static getSingle = async (req: Request, res: Response) => {
    try {
      const productId = req.params.id;
      const product = await db.product.findFirst({
        where: {
          id: productId,
        },
      });
      return res.json({
        data: product,
      });
    } catch (error: any) {
      console.log(error);
      res.send(error.message);
    }
  };
  static postSingle = async (req: Request, res: Response) => {
    try {
      const {
        title,
        thumbnail,
        images,
        description,
        discount,
        isPhysical,
        keywords,
        price,
        stock,
        metadata,
        isAvailable,
        isFeatured,
        category,
      } = req.body;
      const { product } = await db.user.update({
        where: {
          //@ts-ignore
          id: req.userId,
        },
        data: {
          product: {
            create: {
              title,
              thumbnail,
              images,
              description,
              discount,
              isPhysical,
              keywords,
              price,
              stock,
              metadata,
              isAvailable,
              isFeatured,
              categories: {
                connectOrCreate: {
                  where: {
                    title: category,
                  },
                  create: {
                    title: category,
                  },
                },
              },
            },
          },
        },
        include: {
          product: true,
        },
      });
      return res.json({
        data: product,
      });
    } catch (error: any) {
      console.log(error);
      res.send(error.message);
    }
  };
  static putSingle = async (req: Request, res: Response) => {
    try {
      const {
        title,
        thumbnail,
        images,
        description,
        discount,
        isPhysical,
        keywords,
        price,
        stock,
        metadata,
        isAvailable,
        isFeatured,
        category,
      } = req.body;

      const productId = req.params.id;

      let product = await db.product.findFirst({
        where: {
          id: productId,
        },
      });

      if (!product)
        return res.status(404).send(`Product notfound with id : ${productId}`);

      product = await db.product.update({
        where: {
          id: productId,
        },
        data: {
          title,
          thumbnail,
          images,
          description,
          discount,
          isPhysical,
          keywords,
          price,
          stock,
          metadata,
          isAvailable,
          isFeatured,
          categories: {
            connectOrCreate: {
              where: {
                title: category,
              },
              create: {
                title: category,
              },
            },
          },
        },
      });
      return res.json({
        data: product,
      });
    } catch (error: any) {
      console.log(error);
      res.send(error.message);
    }
  };
  static deleteSingle = async (req: Request, res: Response) => {
    try {
      const productId = req.params.id;

      let product = await db.product.findFirst({
        where: {
          id: productId,
        },
      });

      if (!product)
        return res.status(404).send(`Product notfound with id : ${productId}`);

      product = await db.product.delete({
        where: {
          id: productId,
        },
      });
      return res.json({
        data: product,
      });
    } catch (error: any) {
      console.log(error);
      res.send(error.message);
    }
  };
}
