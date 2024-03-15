"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../lib/db");
class UploadController {
    static getAll = async (req, res) => {
        try {
            //@ts-ignore
            const userId = req.userId;
            const files = await db_1.db.file.findMany({
                where: {
                    userId,
                },
            });
            res.json({
                data: files.flatMap(files => files.url),
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    };
}
exports.default = UploadController;
