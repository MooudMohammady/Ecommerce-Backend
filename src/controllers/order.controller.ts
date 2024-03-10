import { Request, Response } from "express";
import { db } from "../lib/db";

export default class OrderController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const orders = await db.order.findMany({
        where: {
          //@ts-ignore
          userId: req.userId,
        },
        include: {
          address: true,
          payments: true,
          refund: true,
          orderItems: true,
        },
      });
      return res.json({
        data: orders,
      });
    } catch (error: any) {
      console.log(error);
      res.send(error.message);
    }
  };

  static getSingle = async (req: Request, res: Response) => {
    try {
      const orderId = req.params.id;
      const order = await db.order.findFirst({
        where: {
          //@ts-ignore
          userId: req.userId,
          id: orderId,
        },
        include: {
          address: true,
          discountCode: true,
          user: true,
          payments: {
            include: {
              provider: true,
            },
          },
          orderItems: {
            include: {
              product: { include: { categories: true } },
            },
          },
          refund: true,
        },
      });
      return res.json({
        data: order,
      });
    } catch (error: any) {
      console.log(error);
      res.send(error.message);
    }
  };

  static createOrder = async (req: Request, res: Response) => {
    try {
      const { addressId, discountCode } = req.body;

      if (discountCode) {
        await db.discountCode.findUniqueOrThrow({
          where: {
            code: discountCode,
            stock: {
              gte: 1,
            },
          },
        });
      }

      const cart = await db.cart.findUniqueOrThrow({
        where: {
          //@ts-ignore
          userId: req.userId,
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      const { tax, total, discount, payable } = calculateCosts({ cart });

      const order = await db.order.create({
        data: {
          user: {
            connect: {
              //@ts-ignore
              id: req.userId,
            },
          },
          status: "Processing",
          total,
          tax,
          payable,
          discount,
          shipping: 0,
          address: {
            connect: { id: addressId },
          },
          orderItems: {
            create: cart?.items.map((orderItem) => ({
              count: orderItem.count,
              price: orderItem.product.price,
              discount: orderItem.product.discount,
              product: {
                connect: {
                  id: orderItem.productId,
                },
              },
            })),
          },
        },
      });

      return res.json({
        data: order,
      });
    } catch (error: any) {
      console.log(error);
      res.send(error.message);
    }
  };

  static deleteOrder = async (req: Request, res: Response) => {
    try {
      const orderId = req.params.id;

      // حذف سفارش مورد نظر از دیتابیس
      await db.order.delete({
        where: {
          id: orderId,
        },
      });

      return res.json({
        message: "Order deleted successfully",
      });
    } catch (error: any) {
      console.log(error);
      res.send(error.message);
    }
  };
}

function calculateCosts({ cart }: { cart: any }) {
  let total = 0,
    discount = 0;

  for (const item of cart?.items) {
    total += item?.count * item?.product?.price;
    discount += item?.count * item?.product?.discount;
  }

  const afterDiscount = total - discount;
  const tax = afterDiscount * 0.09;
  const payable = afterDiscount + tax;

  return {
    total: parseFloat(total.toFixed(2)),
    discount: parseFloat(discount.toFixed(2)),
    afterDiscount: parseFloat(afterDiscount.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    payable: parseFloat(payable.toFixed(2)),
  };
}
