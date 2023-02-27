import type { CognitoProviderBaseArgs } from "app/features/auth/types.provider";
export { withIronSessionSsr } from "iron-session/next";
export { sessionOptions } from "lib/session";




export const exchangeToken = async (options: {
  token: string;
  redirect: string;
}) => {
  if (typeof window !== "undefined") {
    window.location.replace(
      `/api/login?token=${options.token}&redirect=${options.redirect}`
    );
  }
};

export const logout = () => window.location.replace("/api/logout");

// for use in screens

export const getCognitoProvider = (): CognitoProviderBaseArgs => {
  const region = process.env.NEXT_PUBLIC_AWS_REGION;
  if (!region) {
    throw Error("env NEXT_PUBLIC_AWS_REGION not set");
  }
  const ClientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
  if (!ClientId) {
    throw Error("env NEXT_PUBLIC_COGNITO_CLIENT_ID not set");
  }
  // const UserPoolId = process.env.COGNITO_USER_POOL_ID
  // if(!UserPoolId) {throw Error('env COGNITO_USER_POOL_ID not set')}

  return {
    clientProvider: { region },
    ClientId,
  };
};

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

}

export const verifyToken = async (raw_token: string, tokenType: 'id' | 'access') => {

  const region = process.env.NEXT_PUBLIC_AWS_REGION
  if(!region) {throw Error('env NEXT_PUBLIC_AWS_REGION not set')}

  const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID
  if(!userPoolId) {throw Error('env NEXT_PUBLIC_COGNITO_USER_POOL_ID not set')}

  const appClientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID
  if(!appClientId) {throw Error('env NEXT_PUBLIC_COGNITO_CLIENT_ID not set')}

  const {
    verifierFactory,
  } = require('@southlane/cognito-jwt-verifier')

  const verifier = verifierFactory({
      region,
      userPoolId,
      appClientId,
      tokenType
    })

    const decoded: DecodedToken = await verifier.verify(raw_token)
    if(!decoded.email_verified) {throw Error('email not verified')}

    return {email: decoded.email, sub: decoded.sub}
    

}