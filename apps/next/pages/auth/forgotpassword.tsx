// apps/next/pages/auth/signup.tsx
import { ForgotPassword } from "app/features/auth";
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

const navTo = (url: string) => {
  if (typeof window !== "undefined") {
    window.location.replace(url);
  }
}

export const ForgotPasswordPage: React.FC = () => (
  <ForgotPassword
    toConfirmSignup={() => navTo("/auth/confirmsignup")}
    provider={c.getCognitoProvider()}
    toRegister={() => navTo("/auth/signup")}
    toConfirmForgotPassword={() => navTo("/auth/confirmforgotpassword")}
  />
);

export default ForgotPasswordPage;
