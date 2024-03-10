"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../lib/db");
const exclude_1 = __importDefault(require("../lib/exclude"));
class UserController {
    static async changeRole(req, res) {
        try {
            const userId = req.params.id;
            const Role = (await req.body.role);
            let user = await db_1.db.user.findFirstOrThrow({
                where: { id: userId },
            });
            if (!user) {
                return res.status(404).json({
                    message: "user not founded",
                });
            }
            //@ts-ignore
            if (req.userRole !== "SUPER_ADMIN") {
                return res.status(403).json({
                    message: "You are not SUPER ADMIN",
                });
            }
            user = await db_1.db.user.update({
                where: {
                    id: userId,
                },
                data: {
                    Role,
                },
            });
            const excludedUser = (0, exclude_1.default)(user, ["password"]);
            return res.json(excludedUser);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                error,
            });
        }
    }
    static async forgotPassword(req, res) {
        try {
            //@ts-ignore
            const userId = req.userId;
            const { newPassword, password } = await req.body;
            let user = await db_1.db.user.findFirstOrThrow({
                where: { id: userId },
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
                    message: "Invalid password",
                });
            }
            const hashNewPassword = await bcrypt_1.default.hash(newPassword, 2);
            await db_1.db.user.update({
                where: {
                    id: userId,
                },
                data: {
                    password: hashNewPassword,
                },
            });
            return res.json({
                status: "Success",
                message: "Password has successfuly changed.",
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                error,
            });
        }
    }
    static async update(req, res) {
        try {
            //@ts-ignore
            const userId = req.userId;
            const { email, phone, name } = await req.body;
            let user = await db_1.db.user.findFirstOrThrow({
                where: { id: userId },
            });
            if (!user) {
                return res.status(404).json({
                    message: "user not founded",
                });
            }
            let user2 = await db_1.db.user.findFirst({
                where: { email },
            });
            if (user2) {
                return res.status(401).json({
                    message: "Email already exists !",
                });
            }
            user = await db_1.db.user.update({
                where: {
                    id: userId,
                },
                data: {
                    email,
                    phone,
                    name,
                },
            });
            return res.json(user);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                error,
            });
        }
    }
    static async deleteUser(req, res) {
        try {
            //@ts-ignore
            if (req.userRole !== "SUPER_ADMIN") {
                return res.status(403).json({
                    message: "You are not SUPER ADMIN",
                });
            }
            //@ts-ignore
            const userId = req.userId;
            let user = await db_1.db.user.findFirstOrThrow({
                where: { id: userId },
            });
            if (!user) {
                return res.status(404).json({
                    message: "user not founded",
                });
            }
            await db_1.db.user.delete({
                where: { id: userId },
            });
            return res.json({
                message: "User deleted successfuly",
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                error,
            });
        }
    }
}
exports.default = UserController;
