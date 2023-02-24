// apps/next/pages/auth/signup.tsx
import { ConfirmForgotPassword } from "app/features/auth";
import * as c from "lib/auth";

const isBrowser = typeof window !== "undefined";

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

export const ConfirmForgotPasswordPage: React.FC = () => (
  <ConfirmForgotPassword
    provider={c.getCognitoProvider()}
    
    toLogin={() => {
      if (isBrowser) {
        window.location.href = "/auth/login";
      }
    }}
  />
);

export default ConfirmForgotPasswordPage;
