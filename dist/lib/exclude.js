"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function exclude(user, keys) {
    const result = {};
    for (const [key, value] of Object.entries(user)) {
        if (!keys.includes(key)) {
            result[key] = value;
        }
    }
    return result;
}
exports.default = exclude;
