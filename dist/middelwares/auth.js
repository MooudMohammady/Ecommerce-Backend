"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.use(async (req, res, next) => {
    if (!req.headers.authorization) {
        return next(http_errors_1.default.Unauthorized('Access token is required'));
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return next(http_errors_1.default.Unauthorized());
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        //@ts-ignore
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        next(http_errors_1.default.Unauthorized(error?.message));
    }
});
const auth = router;
exports.default = auth;
