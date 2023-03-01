import { Signup } from "app/features/auth/screens";
import { getCognitoProvider } from "../auth";
import { useRouter } from "expo-router";
import {routes} from '../nav'

export default function SignupScreen() {
  const router = useRouter();
  return (
    <Signup
      provider={getCognitoProvider()}
      toBack={() => router.replace(routes.login)}
      toForgotPassword={() => router.replace(routes.forgotPassword)}
      toConfirm={() => router.replace(routes.confirmSignup)}
    />
  );
}
