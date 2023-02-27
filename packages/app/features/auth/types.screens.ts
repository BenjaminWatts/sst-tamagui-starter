import * as p from "./types.provider";

// in happy path order

type BaseAuthScrenProps = {
  provider: p.CognitoProviderBaseArgs;
};

export type SignUpScreenProps = BaseAuthScrenProps & {
  toConfirm: () => void;
  toForgotPassword: () => void;
  // provider: p.SignUpArgs;
};

export type ConfirmSignupScreenProps = BaseAuthScrenProps & {
  toLogin: () => void;
  // provider: p.ConfirmSignUpArgs
};

export type OnTokenResult = { 
  response: {
    AccessToken: string;
    IdToken: string;
  }
  email: string;
  password: string;
}

export type LoginScreenProps = BaseAuthScrenProps & {
  onToken: (result: OnTokenResult) => void;
  toForgotPassword: () => void;
  toRegister: () => void;
  // provider: p.LoginArgs
};

export type ForgotPasswordScreenProps = BaseAuthScrenProps & {
  toConfirmForgotPassword: () => void;
  toRegister: () => void;
  toConfirmSignup: () => void;
  // provider: p.ForgotPasswordArgs
};

export type ConfirmForgotPasswordProps = BaseAuthScrenProps & {
  toLogin: () => void;
  // provider: p.ConfirmForgotPasswordArgs
};

export type DeleteUserScreenProps = BaseAuthScrenProps & {
  onDeleted: () => void;
  // provider: p.DeleteUserArgs
};
