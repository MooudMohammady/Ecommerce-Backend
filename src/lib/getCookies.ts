import { Request } from "express";

export default function getCookies(req: Request) {
  const {
    headers: { cookie },
  } = req;

  if (cookie)
    return cookie.split(";").reduce((res, item) => {
      const data = item.trim().split("=");
      return { ...res, [data[0]]: data[1] };
    }, {}) as any;
}
