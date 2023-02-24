// apps/next/pages/auth/signup.tsx
import { ConfirmSignup } from "app/features/auth";
import * as c from "lib/auth";

export const getServerSideProps = c.withIronSessionSsr(async function ({
  req,
  res,
}) {
  const authenticated = req.session.user !== undefined;
  if (authenticated) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
  }
  return {
    props: {},
  };
},
c.sessionOptions);

export const ConfirmSignupPage: React.FC = () => (
  <ConfirmSignup
    provider={c.getCognitoProvider()}
    toLogin={() => {
      if (typeof window !== "undefined") {
        window.location.replace("/auth/login");
      }
    }}
  />
);

export default ConfirmSignupPage;
