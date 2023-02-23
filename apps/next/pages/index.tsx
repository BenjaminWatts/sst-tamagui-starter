// pages/admin.tsx
// import { HomeScreen } from 'app/features/home/screen'
import { withIronSessionSsr } from "iron-session/next";
import { exchangeToken, logout } from 'lib/auth';
import { sessionOptions } from 'lib/session';

type ServerSideProps = {
  authenticated: boolean
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  return {
    props: {
        authenticated: req.session.user !== undefined
    }
  }
}, sessionOptions)

export const Home:React.FC<ServerSideProps>  = ({authenticated}) => {
  if(authenticated){
    return (<p onClick={() => logout()}>Logout</p>)
  }
  else  {
    return (<a onClick={() => exchangeToken({token: '123', redirect: '/'})}>Login</a>)
  }
}

export default Home