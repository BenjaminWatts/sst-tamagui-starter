//aps/next/pages/index.tsx

import { HomeScreen } from "app/features/home/screen";
import { logout } from "lib/auth";
import * as c from "lib/auth";

export const getServerSideProps = c.withIronSessionSsr(async function ({
  req,
  res,
}) {
  const authenticated = req.session.user !== undefined;
  if (!authenticated) {
    res.setHeader("location", "/auth/login");
    res.statusCode = 302;
    res.end();
  }
  return {
    props: {},
  };
},
c.sessionOptions);

export const Home: React.FC = () => <HomeScreen logout={logout} />;

export default Home;
