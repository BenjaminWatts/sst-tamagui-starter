// import * as IronSession from "iron-session";

import type { IronSessionOptions } from "iron-session";
import type { User } from "pages/api/user";

// if (!process.env.SECRET_COOKIE_PASSWORD) {
//   throw Error('SECRET_COOKIE_PASSWORD not set')
// }

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "iron-session-login-cookie",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}

