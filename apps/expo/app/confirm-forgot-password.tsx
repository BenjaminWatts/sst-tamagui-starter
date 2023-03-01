import { ConfirmForgotPassword } from "app/features/auth/screens";
import { getCognitoProvider } from "../auth";
import { useRouter } from "expo-router";
import {routes} from '../nav'

export default function ConfirmForgotPasswordScreen() {
  const router = useRouter();
  return (
    <ConfirmForgotPassword
      toBack={() => router.replace(routes.forgotPassword)}
      provider={getCognitoProvider()}
      toLogin={() => router.replace(routes.login)}
    />
  );
}
