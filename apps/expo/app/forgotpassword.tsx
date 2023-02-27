import { ForgotPassword } from "app/features/auth/screens";
import { Text } from "react-native";
import { getCognitoProvider, useIsAuthenticated } from "../auth";
import { useRouter } from "expo-router";


export default function ForgotPasswordScreen() {
    const router = useRouter();
  return <ForgotPassword
    provider={getCognitoProvider()}
    toLogin={() =>  router.push("/")}

  />
}