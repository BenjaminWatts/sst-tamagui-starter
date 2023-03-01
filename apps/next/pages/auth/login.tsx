//aps/next/pages/auth/login.tsx
import { Login } from "app/features/auth";
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

export const LoginPage: React.FC = () => (
  <Login
    toRegister={() => nav("/auth/signup")}
   toForgotPassword={() => nav("/auth/forgotpassword")}
    provider={c.getCognitoProvider()}
    onToken={async (result) => {
      
      c.exchangeToken({
        token: result.response.IdToken,
        redirect: "/",
      });
    }}
  />
);

// const LoginPage = () => <div>Hello</div>

export default LoginPage;
