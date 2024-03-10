"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../lib/db");
class UploadController {
    static upload = async (req, res) => {
        const file = await db_1.db.file.create({
            data: {
                //@ts-ignore
                userId: req.userId,
                //@ts-ignore
                url: req.file.location,
            },
        });
        res.json(file);
    };
}
exports.default = UploadController;
