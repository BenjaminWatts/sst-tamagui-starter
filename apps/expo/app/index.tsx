import { Login } from "app/features/auth/screens";
import { getCognitoProvider, logout, storeCreds, useIsAuthenticated } from "../auth";
import { useRouter } from "expo-router";
import { HomeScreen } from "app/features/home/screen";
import React from "react";
import {routes} from '../nav'

type AuthedScreenProps = {
  Screen: any; //React.FC<{logout?: () => void}>
};

const WithAuth: React.FC<AuthedScreenProps> = ({ Screen }) => {
  const router = useRouter();

  const { authenticated, setIsAuthenticated } = useIsAuthenticated();

  const attemptLogout = async () => {
    console.log('logging out')
    await logout();
    console.log()
    setIsAuthenticated(false);
  };

  if (!authenticated) {
    return (
      <Login
        provider={getCognitoProvider()}
        onToken={async (result) => {
          await storeCreds(result);
          setIsAuthenticated(true);
        }}
        toForgotPassword={() => router.push(routes.forgotPassword)}
        toRegister={() => router.push(routes.signup)}
      />
    );
  }

  return <Screen logout={attemptLogout} />;
};

export const App = () => <WithAuth Screen={HomeScreen} />;
export default App;
