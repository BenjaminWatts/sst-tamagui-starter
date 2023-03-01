// apps/next/pages/auth/signup.tsx
import { Signup } from "app/features/auth";
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

const nav = (url: string) => {
  if(typeof window !== "undefined") window.location.replace(url)

}
export const SignupPage: React.FC = () => (
  <Signup
    provider={c.getCognitoProvider()}
    toBack={() => nav("/")}
    toForgotPassword={() => nav("/auth/forgotpassword")}
    toConfirm={() => nav("/auth/confirmsignup")}
  />
);

export default SignupPage;
