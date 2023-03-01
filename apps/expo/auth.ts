import { login } from "app/features/auth/provider";
import {
  CognitoProviderBaseArgs,
  LoginResponse,
} from "app/features/auth/types.provider";
import { OnTokenResult } from "app/features/auth/types.screens";
import * as SecureStore from "expo-secure-store";
import React from "react";

const region = process.env.AWS_REGION;
const ClientId = process.env.COGNITO_CLIENT_ID;

export const getCognitoProvider = (): CognitoProviderBaseArgs => {
  if (!region) {
    throw Error("env AWS_REGION not set");
  }

  if (!ClientId) {
    throw Error("env COGNITO_CLIENT_ID not set");
  }
  const output = {
    clientProvider: { region },
    ClientId,
  };
  return output;
};

const credsKey = "credentials";
const tokenKey = "token";

type EmailPassword = {
  email: string;
  password: string;
};

// type StoredCreds = EmailPassword & {
//     response: LoginResponse
// }

export const storeCreds = async (options: OnTokenResult) => {
  console.log("storeCreds");
  await Promise.all([
    SecureStore.setItemAsync(
      credsKey,
      JSON.stringify({ email: options.email, password: options.password })
    ),
    SecureStore.setItemAsync(tokenKey, options.response.IdToken),
  ]);
};

export const loadCreds = async (): Promise<EmailPassword> => {
  const stored = await SecureStore.getItemAsync(credsKey);
  if (!stored) throw new Error("No stored credentials");
  return JSON.parse(stored);
};

export const loadToken = async (): Promise<string> => {
  const stored = await SecureStore.getItemAsync(tokenKey);
  // console.log(stored)
  if (!stored) throw new Error("No stored token");
  return stored;
};

export const attemptLogin = async (options: EmailPassword) => {
  try {
    const creds = await loadCreds();
    if (creds.email === options.email && creds.password === options.password) {
      const { email, password } = options;
      const loginResponse = await login({
        ...getCognitoProvider(),
        request: {
          Username: email,
          Password: password,
        },
      });
      await storeCreds({
        email,
        password,
        response: loginResponse,
      });
    }
  } catch (e) {}
};

export const AuthContext = React.createContext(false);

export type DecodedToken = {
  sub: string;
  email_verified: boolean;
  iss: string;
  "cognito:username": string;
  origin_jti: string;

  aud: string;
  event_id: string;
  token_use: string;
  auth_time: number;
  exp: number;
  iat: number;
  email: string;
};

// const region = process.env.AWS_REGION

export const verifyToken = async (
  raw_token: string,
  tokenType: "id" | "access"
) => {
  console.log("verifyToken", raw_token, tokenType);

  if (!region) {
    throw Error("env AWS_REGION not set");
  }

  const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;
  if (!userPoolId) {
    throw Error("env NEXT_PUBLIC_COGNITO_USER_POOL_ID not set");
  }

  // const appClientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID
  if (!ClientId) {
    throw Error("env NEXT_PUBLIC_COGNITO_CLIENT_ID not set");
  }

  const { decode } = require("react-native-pure-jwt");

  const decoded: DecodedToken = decode(raw_token);
  console.log(decoded);
  // const {
  //   verifierFactory,
  // } = require('@southlane/cognito-jwt-verifier')

  // const verifier = verifierFactory({
  //     region,
  //     userPoolId,
  //     appClientId,
  //     tokenType
  //   })

  //   const decoded: DecodedToken = await verifier.verify(raw_token)
  if (!decoded.email_verified) {
    throw Error("email not verified");
  }

  return { email: decoded.email, sub: decoded.sub };
};

export const checkAuth = async (): Promise<boolean> => {
  console.log("checkAuth");
  try {
    const token = await loadToken();
    console.log(token);
    await verifyToken(token, "id");
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const useIsAuthenticated = () => {
  const [authenticated, setIsAuthenticated] = React.useState(false);
  const check = async () => {
    const result = await checkAuth();
    setIsAuthenticated(result);
  };
  React.useEffect(() => {
    if (!authenticated) {
      check();
    }
  }, [authenticated]);
  return { authenticated, setIsAuthenticated, check };
};

// class App extends React.Component {
//     render() {
//       const {signedInUser, theme} = this.props;

//       // App component that provides initial context values
//       return (
//         <ThemeContext.Provider value={theme}>
//           <UserContext.Provider value={signedInUser}>
//             <Layout />
//           </UserContext.Provider>
//         </ThemeContext.Provider>
//       );
//     }
//   }

// function Content() {
//     return (
//       <ThemeContext.Consumer>
//         {theme => (
//           <UserContext.Consumer>
//             {user => (
//               <ProfilePage user={user} theme={theme} />
//             )}
//           </UserContext.Consumer>
//         )}
//       </ThemeContext.Consumer>
//     );
//   }

export const logout = async () => {
  console.log("clearing out token");
  await Promise.all([
    SecureStore.deleteItemAsync(credsKey),
    SecureStore.deleteItemAsync(tokenKey),
  ]);
};
