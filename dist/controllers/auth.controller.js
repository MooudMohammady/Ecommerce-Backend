"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../lib/db");
const exclude_1 = __importDefault(require("../lib/exclude"));
class AuthController {
    static refreshTokens = [];
    static auth = async (req, res) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(404).json({
                message: "token notfound!",
            });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const user = await db_1.db.user.findFirst({
                where: { id: decoded.userId },
            });
            if (!user) {
                throw new Error("user notfound");
            }
            const userWithoutPassword = (0, exclude_1.default)(user, ["password"]);
            return res.json(userWithoutPassword);
        }
        catch (error) {
            // Handle invalid token or other authentication failures
            console.error(error);
            return res.status(500).json({
                error,
            });
        }
    };
    static signIn = async (req, res) => {
        const { email, password } = await req.body;
        try {
            const user = await db_1.db.user.findFirst({
                where: { email: email.toLowerCase().toString() },
            });
            if (!user) {
                return res.status(404).json({
                    message: "user not founded",
                });
            }
            const isValid = await bcrypt_1.default.compare(password, user.password);
            if (!isValid) {
                return res.status(401).json({
                    status: "failed",
                    id: null,
                    token: null,
                    message: "invalid eamil or password",
                });
            }
            const accessToken = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, {
                expiresIn: 600,
            });
            const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET);
            // Set refersh token in refreshTokens array
            AuthController.refreshTokens.push(refreshToken);
            return res.json({
                status: "success",
                id: user.id,
                refreshToken,
                accessToken,
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                error,
            });
        }
    };
    static signUp = async (req, res) => {
        try {
            const { email, phone, password, name } = await req.body;
            const hashPassword = await bcrypt_1.default.hash(password, 2);
            let user = await db_1.db.user.findFirst({
                where: {
                    email: email.toLowerCase().toString(),
                },
            });
            if (user) {
                return res.status(401).json({
                    message: "user founded",
                });
            }
            user = await db_1.db.user.create({
                data: {
                    email,
                    phone,
                    password: hashPassword,
                    name,
                },
            });
            return res.json(user);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                error,
            });
        }
    };
    static signOut = async (req, res) => {
        const refreshToken = (await req.body.refresh) || (await req.body.token) || (await req.body.refreshToken);
        if (!refreshToken) {
            return res.status(401).json({
                error: "Refresh token not found",
            });
        }
        AuthController.refreshTokens = this.refreshTokens.filter((rtoken) => rtoken !== refreshToken);
        return res.sendStatus(204);
    };
    static async refresh(req, res) {
        try {
            const refreshToken = (await req.body.refresh) || (await req.body.token) || (await req.body.refreshToken);
            // Token not found
            if (!refreshToken) {
                return res.status(401).json({
                    message: "Authorization failed",
                });
            }
            // If the refresh token does not exist in the array
            if (!AuthController.refreshTokens.includes(refreshToken)) {
                return res.status(403).json({
                    message: "Access denied",
                });
            }
            jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_SECRET, (err, data) => {
                if (err)
                    return res.status(403).json({
                        message: "Access denied! Token is invalid",
                    });
                const accessToken = jsonwebtoken_1.default.sign({ userId: data.userId }, process.env.JWT_SECRET, {
                    expiresIn: 600,
                });
                return res.json({
                    accessToken,
                });
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                error,
            });
        }
    }
}
exports.default = AuthController;
