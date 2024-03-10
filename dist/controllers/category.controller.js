"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../lib/db");
class CategoryController {
    static getAll = async (req, res) => {
        try {
            const category = await db_1.db.category.findMany({
                include: {
                    products: true,
                },
            });
            return res.json({
                data: category,
            });
        }
        catch (error) {
            console.log(error);
            res.send(error.message);
        }
    };
    static getSingle = async (req, res) => {
        try {
            const categoryId = req.params.id;
            const category = await db_1.db.category.findFirst({
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
        }
        catch (error) {
            console.log(error);
            res.send(error.message);
        }
    };
    static postSingle = async (req, res) => {
        try {
            const { title, description } = req.body;
            const category = await db_1.db.category.create({
                data: {
                    title,
                    description,
                },
            });
            return res.json({
                data: category,
            });
        }
        catch (error) {
            console.log(error);
            res.send(error.message);
        }
    };
    static putSingle = async (req, res) => {
        try {
            const { title, description } = req.body;
            const categoryId = req.params.id;
            let category = await db_1.db.category.findFirst({
                where: {
                    id: categoryId,
                },
            });
            if (!category)
                return res
                    .status(404)
                    .send(`Category notfound with id : ${categoryId}`);
            category = await db_1.db.category.update({
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
        }
        catch (error) {
            console.log(error);
            res.send(error.message);
        }
    };
    static deleteSingle = async (req, res) => {
        try {
            const categoryId = req.params.id;
            let category = await db_1.db.category.findFirst({
                where: {
                    id: categoryId,
                },
            });
            if (!category)
                return res
                    .status(404)
                    .send(`Category notfound with id : ${categoryId}`);
            category = await db_1.db.category.delete({
                where: {
                    id: categoryId,
                },
            });
            return res.json({
                data: category,
            });
        }
        catch (error) {
            console.log(error);
            res.send(error.message);
        }
    };
}
exports.default = CategoryController;
