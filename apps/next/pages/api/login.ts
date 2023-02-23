import type { User } from "./user";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

function isUrlAbsolute(url: string) { 
  if(url === '/') {return true}
  return /^[a-z][a-z0-9+.-]*:/.test(url) === false
}

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const {token} = req.query
  if(typeof token !== 'string') {throw Error(`token is not a string: ${token}`)}
  
  const {redirect} = req.query
  if(typeof redirect !== 'string' || !isUrlAbsolute(redirect)) {throw Error(`redirect is not a string or is to an external site: ${redirect}`)}

  try {
    console.log(`processing login token ${token}`)
    const user = { isLoggedIn: true, login: 'ben@kilowatts.io' } as User;
    req.session.user = user;
    console.log(res)
    await req.session.save();
    console.log('successfully created session')
    // res.json(user);
    res.redirect(redirect)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}