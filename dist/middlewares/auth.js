"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = require("express");
const db_1 = require("../lib/db");
const router = (0, express_1.Router)();
router.use(async (req, res, next) => {
    if (!req.headers.authorization) {
        return next(http_errors_1.default.Unauthorized("Access token is required"));
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return next(http_errors_1.default.Unauthorized());
    }
    try {
        const userId = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await db_1.db.user.findFirst({
            where: {
                id: userId,
            },
        });
        if (user?.Role === "PERSON")
            next(http_errors_1.default.Forbidden("Access denied. You do not have permission to perform this action"));
        //@ts-ignore
        req.userRole = user?.Role;
        //@ts-ignore
        req.userId = userId;
        next();
    }
    catch (error) {
        next(http_errors_1.default.Unauthorized(error?.message));
    }
});
const auth = router;
exports.default = auth;
