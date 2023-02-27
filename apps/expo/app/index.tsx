import { Login } from "app/features/auth/screens";
import { getCognitoProvider, storeCreds, useIsAuthenticated, logout } from "../auth";
import { useRouter } from "expo-router";
import { HomeScreen } from "app/features/home/screen";
import React, { Children } from 'react';
import {Text} from 'react-native'

type AuthedScreenProps = {
  Screen: any; //React.FC<{logout?: () => void}>
}


const WithAuth:React.FC<AuthedScreenProps> = ({Screen}) => {
  const router = useRouter();

  const {authenticated, setIsAuthenticated} = useIsAuthenticated()

  const logout = async() => {
    await logout()
    setIsAuthenticated(false)
  }
  
  if(!authenticated) {
    return (
      <Login
        provider={getCognitoProvider()}
        onToken={async(result) => {
          await storeCreds(result)
          setIsAuthenticated(true)
        }}
        toForgotPassword={() => router.push('/forgotpassword')}
        toRegister={() => router.push('/register')}
    />
  )}

  return <Screen logout={logout} />

}

export default () => <WithAuth Screen={HomeScreen}/>