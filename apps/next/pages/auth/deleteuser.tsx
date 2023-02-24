// apps/next/pages/auth/signup.tsx
import { DeleteUser } from "app/features/auth";
import * as c from "lib/auth";

export const getServerSideProps = c.withIronSessionSsr(async function ({
  req,
  res,
}) {
  const authenticated = req.session.user !== undefined;
  if (!authenticated) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
  }
  return {
    props: {},
  };
},
c.sessionOptions);

export const DeleteUserPage: React.FC = () => (
  <DeleteUser provider={c.getCognitoProvider()} onDeleted={() => c.logout()} />
);

export default DeleteUserPage;
