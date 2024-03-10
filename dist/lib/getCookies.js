"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCookies(req) {
    const { headers: { cookie }, } = req;
    if (cookie)
        return cookie.split(";").reduce((res, item) => {
            const data = item.trim().split("=");
            return { ...res, [data[0]]: data[1] };
        }, {});
}
exports.default = getCookies;
