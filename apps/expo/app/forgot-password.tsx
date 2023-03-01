import { ForgotPassword } from "app/features/auth/screens";
import { getCognitoProvider, useIsAuthenticated } from "../auth";
import { useRouter } from "expo-router";
import {routes} from '../nav'

export default function ForgotPasswordScreen() {
  const router = useRouter();
  return (
    <ForgotPassword
      provider={getCognitoProvider()}
      toBack={() => router.replace(routes.login)}

      toConfirmForgotPassword={() => router.replace(routes.confirmForgotPassword)}
      toRegister={() => router.replace(routes.signup)}
      toConfirmSignup={() => router.replace(routes.confirmSignup)}
    />
  );
}
