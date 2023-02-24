// pages/api/login.ts

import type { User } from "./user";
export { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { verifyToken } from "lib/auth";



function isUrlAbsolute(url: string) {
  if (url === "/") {
    return true;
  }
  return /^[a-z][a-z0-9+.-]*:/.test(url) === false;
}

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;
  if (typeof token !== "string") {
    throw Error(`token is not a string: ${token}`);
  }

  const { redirect } = req.query;
  if (typeof redirect !== "string" || !isUrlAbsolute(redirect)) {
    throw Error(
      `redirect is not a string or is to an external site: ${redirect}`
    );
  }

  try {
    try {
      const decoded = await verifyToken(token, 'id')
      const user = { isLoggedIn: true, login: decoded.email } as User;
      req.session.user = user;
      await req.session.save();
      // console.log(`successfully created session for ${decoded.email}`);
      res.redirect(redirect);
    } catch(e) {
      console.log('token is invalid')
      return res.status(401).json({ message: 'token is invalid' });
    }

  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);