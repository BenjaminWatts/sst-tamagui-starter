import { ForgotPassword } from "app/features/auth/screens";
import { Text } from "react-native";
import { getCognitoProvider, useIsAuthenticated } from "../auth";
import { useRouter } from "expo-router";
import {routes} from '../nav'

export default function RegisterScreen() {
  const router = useRouter();
  return (
    <ForgotPassword
      provider={getCognitoProvider()}
      toConfirmForgotPassword={() => router.push(routes.confirmForgotPassword)}
      toRegister={() => router.push(routes.register)}
      toConfirmSignup={() => router.push(routes.confirmSignup)}      
    />
  );
}
