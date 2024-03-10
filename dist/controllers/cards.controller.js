"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../lib/db");
class CartController {
    static getCart = async (req, res) => {
        try {
            //@ts-ignore
            const userId = req.userId;
            const cart = await db_1.db.cart.findUnique({
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
        }
        catch (error) {
            console.log(error);
            res.send(error.message);
        }
    };
    static addToCart = async (req, res) => {
        try {
            //@ts-ignore
            const userId = req.userId;
            const { productId, count } = req.body;
            const cartItem = await db_1.db.cartItem.create({
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
        }
        catch (error) {
            console.log(error);
            res.send(error.message);
        }
    };
    static removeFromCart = async (req, res) => {
        try {
            //@ts-ignore
            const userId = req.userId;
            const { cartItemId } = req.params;
            const cardItem = await db_1.db.cartItem.findFirst({
                where: {
                    id: cartItemId,
                },
            });
            if (!cardItem)
                return res.status(404).send(`CardItem notfound with id : ${cartItemId}`);
            await db_1.db.cartItem.delete({
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
        }
        catch (error) {
            console.log(error);
            res.send(error.message);
        }
    };
}
exports.default = CartController;
