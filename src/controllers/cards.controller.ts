import { Request, Response } from "express";
import { db } from "../lib/db";

export default class CartController {
  static getCart = async (req: Request, res: Response) => {
    try {
      //@ts-ignore
      const userId = req.userId;

      const cart = await db.cart.findUnique({
        where: {
          userId: userId,
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      return res.json({
        data: cart,
      });
    } catch (error: any) {
      console.log(error);
      res.send(error.message);
    }
  };

  static addToCart = async (req: Request, res: Response) => {
    try {
      //@ts-ignore
      const userId = req.userId;
      const { productId, count } = req.body;

      const cartItem = await db.cartItem.create({
        data: {
          cart: {
            connectOrCreate: {
              where: {
                userId,
              },
              create: {
                userId,
              },
            },
          },
          product: {
            connect: {
              id: productId,
            },
          },
          count: count,
        },
      });

      return res.json({
        data: cartItem,
      });
    } catch (error: any) {
      console.log(error);
      res.send(error.message);
    }
  };

  static removeFromCart = async (req: Request, res: Response) => {
    try {
      //@ts-ignore
      const userId = req.userId;
      const { cartItemId } = req.params;

      const cardItem = await db.cartItem.findFirst({
        where: {
          id: cartItemId,
        },
      });

      if (!cardItem)
        return res.status(404).send(`CardItem notfound with id : ${cartItemId}`);

      await db.cartItem.delete({
        where: {
          id: cartItemId,
          cart: {
            userId: userId,
          },
        },
      });

      return res.json({
        message: "Item removed from cart successfully",
      });
    } catch (error: any) {
      console.log(error);
      res.send(error.message);
    }
  };
}
