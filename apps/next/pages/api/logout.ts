//apps/next/pages/api/logout.ts

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import type { User } from "pages/api/user";

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

function logoutRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  // console.log(`logoutRoute: ${JSON.stringify(req.session)}`);
  req.session.destroy();
  res.redirect("/");
}
