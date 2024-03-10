"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = require("express");
const db_1 = require("../lib/db");
const getCookies_1 = __importDefault(require("../lib/getCookies"));
const router = (0, express_1.Router)();
router.use(async (req, res, next) => {
    let token = (0, getCookies_1.default)(req).token;
    if (token)
        req.headers.authorization = `Bearer ${token}`;
    if (!req.headers.authorization) {
        return next(http_errors_1.default.Unauthorized("Access token is required"));
    }
    token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return next(http_errors_1.default.Unauthorized());
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await db_1.db.user.findFirst({
            where: {
                id: decoded.userId,
            },
        });
        if (user?.Role !== "SUPER_ADMIN" &&
            user?.Role !== "ADMIN" &&
            user?.Role !== "AUTHOR")
            next(http_errors_1.default.Forbidden("Access denied. You do not have permission to perform this action"));
        //@ts-ignore
        req.userRole = user?.Role;
        //@ts-ignore
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        next(http_errors_1.default.Unauthorized(error?.message));
    }
});
const authorAndAdminCheck = router;
exports.default = authorAndAdminCheck;
