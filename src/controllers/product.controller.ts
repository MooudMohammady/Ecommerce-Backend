import { Request, Response } from "express";

import { db } from "../lib/db";

function parseSortString(sortString: string) {
  const sortObj = {};
  if (sortString) {
    const sortFields = sortString.split(",");
    sortFields.forEach((field) => {
      const [key, value] = field.trim().split(":");
      console.log(key,value);
      
      //@ts-ignore
      sortObj[key] = value.toUpperCase() === "DESC" ? "desc" : "asc";
    });
  }
  return sortObj;
}

export default class ProductController {
  static getAll = async (req: Request, res: Response) => {
    try {
      let queryString = req.query as any;
      let queryObj = { ...queryString };
      const excludedFields = [
        "page",
        "sort",
        "limit",
        "fields",
        "q",
        "min_price",
        "max_price",
      ];
      excludedFields.forEach((el) => delete queryObj[el]);

      // Sort
      const orderBy = parseSortString(queryString.sort);

      // Pagination
      const page = queryString.page * 1 || 1;
      const take = queryString.limit * 1 || 20;
      const skip = (page - 1) * take;

      // Search
      if (queryString.q) {
        queryObj = {
          ...queryObj,
          OR: [
            { title: { contains: queryString.q } },
            { description: { contains: queryString.q } },
          ],
        };
      }

      const products = await db.product.findMany({
        where: queryObj,
        include: { categories: true },
        orderBy,
        skip,
        take,
      });

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
        include: {
          categories: true,
        },
      });
      console.log(product);

      if (!product) {
        return res.status(404).json({
          data: null,
          message: `product not found by id : ${productId}`,
        });
      }
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
        data: product.pop(),
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
        return res
          .status(404)
          .json({ message: `Product notfound with id : ${productId}` });

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
        return res
          .status(404)
          .json({ message: `Product notfound with id : ${productId}` });

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
