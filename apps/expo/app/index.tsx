import { Login } from "app/features/auth/screens";
import { getCognitoProvider, storeCreds, useIsAuthenticated, logout } from "../auth";
import { useRouter } from "expo-router";
import { HomeScreen } from "app/features/home/screen";


export default function Home() {
  const router = useRouter();

  const {authenticated, setIsAuthenticated} = useIsAuthenticated()
  return authenticated ? <HomeScreen
    logout={async() => {
      await logout()
      setIsAuthenticated(false)
    }}
  /> : <Login
      provider={getCognitoProvider()}
      onToken={async(result) => {
        await storeCreds(result)
        setIsAuthenticated(true)
      }}
      toForgotPassword={() => router.push('/forgotpassword')}
      toRegister={() => router.push('/register')}
    />
}