"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../lib/db");
class ProductController {
    static getAll = async (req, res) => {
        try {
            const products = await db_1.db.product.findMany({
                include: { categories: true },
            });
            return res.json({
                data: products,
            });
        }
        catch (error) {
            console.log(error);
            res.send(error.message);
        }
    };
    static getSingle = async (req, res) => {
        try {
            const productId = req.params.id;
            const product = await db_1.db.product.findFirst({
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
        }
        catch (error) {
            console.log(error);
            res.send(error.message);
        }
    };
    static postSingle = async (req, res) => {
        try {
            const { title, thumbnail, images, description, discount, isPhysical, keywords, price, stock, metadata, isAvailable, isFeatured, category, } = req.body;
            const { product } = await db_1.db.user.update({
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
        }
        catch (error) {
            console.log(error);
            res.send(error.message);
        }
    };
    static putSingle = async (req, res) => {
        try {
            const { title, thumbnail, images, description, discount, isPhysical, keywords, price, stock, metadata, isAvailable, isFeatured, category, } = req.body;
            const productId = req.params.id;
            let product = await db_1.db.product.findFirst({
                where: {
                    id: productId,
                },
            });
            if (!product)
                return res
                    .status(404)
                    .json({ message: `Product notfound with id : ${productId}` });
            product = await db_1.db.product.update({
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
        }
        catch (error) {
            console.log(error);
            res.send(error.message);
        }
    };
    static deleteSingle = async (req, res) => {
        try {
            const productId = req.params.id;
            let product = await db_1.db.product.findFirst({
                where: {
                    id: productId,
                },
            });
            if (!product)
                return res
                    .status(404)
                    .json({ message: `Product notfound with id : ${productId}` });
            product = await db_1.db.product.delete({
                where: {
                    id: productId,
                },
            });
            return res.json({
                data: product,
            });
        }
        catch (error) {
            console.log(error);
            res.send(error.message);
        }
    };
}
exports.default = ProductController;
