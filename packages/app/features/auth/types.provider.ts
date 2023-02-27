export type ClientProviderArgs = {
  region: string;
};

export type CognitoProviderBaseArgs = {
  clientProvider: ClientProviderArgs;
  ClientId: string;
};

export type SignUpArgs = CognitoProviderBaseArgs & {
  request: {
    Username: string;
    Password: string;
  };
};

export type SignupResponse = {
  medium: string;
  destination: string;
};

export type ConfirmSignUpArgs = CognitoProviderBaseArgs & {
  request: {
    Username: string;
    ConfirmationCode: number;
  };
};

export type ConfirmSignUpResponse = {};

export type LoginArgs = CognitoProviderBaseArgs & {
  request: {
    Username: string;
    Password: string;
  };
};

export type LoginResponse = {
  AccessToken: string;
  IdToken: string;
  RefreshToken: string;
};

export type ForgotPasswordArgs = CognitoProviderBaseArgs & {
  request: {
    Username: string;
  };
  toConfirmSignup: () => void;
};

export type ForgotPasswordResponse = {
  medium: string;
  destination: string;
};

export type ConfirmForgotPasswordArgs = CognitoProviderBaseArgs & {
  request: {
    Username: string;
    ConfirmationCode: string;
    Password: string; // the new password
  };
};

export type ConfirmForgotPasswordResponse = {};

export type DeleteUserArgs = LoginArgs;
export type DeleteUserResponse = {};
