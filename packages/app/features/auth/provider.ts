//packages/app/features/auth/provider.ts

import {
  CognitoIdentityProviderClient,
  ConfirmForgotPasswordCommand,
  ConfirmSignUpCommand,
  DeleteUserCommand,
  ForgotPasswordCommand,
  InitiateAuthCommand,
  ResendConfirmationCodeCommand,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import
import * as t from "./types.provider";

// const AuthFlow = "USER_PASSWORD_AUTH";

const client = (args: t.ClientProviderArgs) =>
  new CognitoIdentityProviderClient(args);

// register

export const signUp = async ({
  clientProvider,
  request,
  ClientId,
}: t.SignUpArgs): Promise<t.SignupResponse> => {
  const command = new SignUpCommand({
    ClientId,
    ...request,
  });
  try {
    const res = await client(clientProvider).send(command);
    const medium = res.CodeDeliveryDetails?.DeliveryMedium;
    const destination = res.CodeDeliveryDetails?.Destination;
    if (!medium || !destination) {
      throw Error("No medium or destination returned by AWS Cognito");
    }
    return { medium, destination };
  } catch (e) {
    console.error(e);
    throw Error(e);
  }
};

export const confirm = async ({
  clientProvider,
  request,
  ClientId,
}: t.ConfirmSignUpArgs): Promise<t.ConfirmSignUpResponse> => {
  const command = new ConfirmSignUpCommand({ ...request, ClientId });
  try {
    const res = await client(clientProvider).send(command);
    return {};
  } catch (e) {
    console.error(e);
    throw Error(e);
  }
};

// login
export const login = async ({
  clientProvider,
  ClientId,
  request,
}: t.LoginArgs): Promise<t.LoginResponse> => {
  const command = new InitiateAuthCommand({
    ClientId,
    AuthFlow: 'USER_PASSWORD_AUTH',
    AuthParameters: {
      USERNAME: request.Username,
      EMAIL: request.Username,
      PASSWORD: request.Password,
    },
  });
  try {
    const res = await client(clientProvider).send(command);
    const { ChallengeName } = res;
    if (ChallengeName !== undefined && ChallengeName !== null) {
      if (ChallengeName === "NEW_PASSWORD_REQUIRED") {
        // implement RespondToAuthChallenge with NEW_PASSWORD
        throw Error("NEW_PASSWORD_REQUIRED");
      }
      throw Error(ChallengeName);
    }
    if (!res.AuthenticationResult) {
      throw Error("No AuthenticationResult returned by AWS Cognito");
    }
    const { AccessToken, IdToken, RefreshToken } = res.AuthenticationResult;
    if (!AccessToken) {
      throw Error("No AccessToken returned by AWS Cognito");
    }
    if (!IdToken) {
      throw Error("No IdToken returned by AWS Cognito");
    }
    if (!RefreshToken) {
      throw Error("No RefreshToken returned by AWS Cognito");
    }
    return {
      AccessToken,
      IdToken,
      RefreshToken,
    };
  } catch (e) {
    console.error(e);
    throw Error(e);
  }
};

// forgotten passwords

export const forgotPassword = async ({
  clientProvider,
  request,
  ClientId,
  toConfirmSignup
}: t.ForgotPasswordArgs): Promise<t.ForgotPasswordResponse> => {
  const command = new ForgotPasswordCommand({ ...request, ClientId });
  try {
    const res = await client(clientProvider).send(command);
    const medium = res.CodeDeliveryDetails?.DeliveryMedium;
    const destination = res.CodeDeliveryDetails?.Destination;
    if (!medium || !destination) {
      throw Error("No medium or destination returned by AWS Cognito");
    }
    return { medium, destination };
  } catch (e) {
    console.log(e)
    if(e.message == 'Cannot reset password for the user as there is no registered/verified email or phone_number') {
      const resendCommand = new ResendConfirmationCodeCommand({ Username: request.Username, ClientId })
      try {
        await client(clientProvider).send(resendCommand)
        toConfirmSignup()
      } catch (e) {
        throw Error(e)
      }
     
    }
    console.error(e);
    throw Error(e);
  }
};

export const confirmForgotPassword = async ({
  clientProvider,
  request,
  ClientId,
}: t.ConfirmForgotPasswordArgs): Promise<t.ConfirmForgotPasswordResponse> => {
  const command = new ConfirmForgotPasswordCommand({
    ConfirmationCode: String(request.ConfirmationCode),
    Password: request.Password,
    Username: request.Username,
    ClientId 
  });

  try {
    await client(clientProvider).send(command);
    return {};
  } catch (e) {
    console.error(e);
    throw Error(e);
  }
};

// delete user

export const deleteUser = async (
  args: t.LoginArgs
): Promise<t.DeleteUserResponse> => {
  // first logs in to verify that Username and Password are correct
  const { AccessToken } = await login(args);
  const command = new DeleteUserCommand({ AccessToken });

  try {
    await client(args.clientProvider).send(command);
    return {};
  } catch (e) {
    console.error(e);
    throw Error(e);
  }
};
