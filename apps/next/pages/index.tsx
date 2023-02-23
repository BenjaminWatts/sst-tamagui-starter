//aps/next/pages/index.tsx

import { HomeScreen } from 'app/features/home/screen'
import {LoginScreen} from 'app/features/login/screen'
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
    return <HomeScreen
      logout={logout}
    />
  }
  else  {
    return <LoginScreen login={() => exchangeToken({
      token: '123',
      redirect: '/'
    })}/>
    
  }
}

export default Home