import * as buttons from "./buttons";
import * as formFields from "./formFields";
import React from "react";
import { AuthScreenLayout as Layout } from "./layout";
import * as t from "./types.screens";
import * as p from "./provider";
import { AuthErrorAlert } from "./alert";
import { Separator, XGroup, Text, YGroup, Label } from "@my/ui";

// with free text email and password fields

export const Signup: React.FC<t.SignUpScreenProps> = ({
  toConfirm,
  provider,
  toForgotPassword
}) => {
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);

  return (
    <Layout>


      <formFields.EmailPassword
        loading={loading}
        confirmText="Register"
        onSubmit={async ({ email, password }) => {
          try {
            setLoading(true);
            await p.signUp({
              ...provider,
              request: { Username: email, Password: password },
            });
            toConfirm();
          } catch (e) {
            setError(e);
          } finally {
            setLoading(false);
          }
        }}
      />
      {error && <>
        <Label/>
        <Text color='red'>{error.message}</Text>
      </>}
      <YGroup space={5}  style={{width: '100%'}}>
        <buttons.ForgotPassword onPress={toForgotPassword} />
      </YGroup>
    </Layout>
  );
};

export const Login: React.FC<t.LoginScreenProps> = ({ 
  provider, 
  onToken,
  toForgotPassword,
  toRegister

}) => {
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);

  return (
    <Layout>

      <formFields.EmailPassword
        loading={loading}
        confirmText="Login"
        onSubmit={async ({ email, password }) => {
          try {
            setLoading(true);
            const token = await p.login({
              ...provider,
              request: { Username: email, Password: password },
            });
            onToken(token);
          } catch (e) {

            setError(e);
          } finally {
            setLoading(false);
          }
        }}
      />
      {error && <>
        <Label/>
        <Text color='red'>{error.message}</Text>
      </>}
      <Separator />
      <YGroup style={{paddingTop: 10, width: '100%'}}>
        <buttons.ForgotPassword onPress={toForgotPassword} />
        <buttons.Register onPress={toRegister} />
      </YGroup>
    </Layout>
  );
};

export const DeleteUser: React.FC<t.DeleteUserScreenProps> = ({
  provider,
  onDeleted,
}) => {
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);

  return (
    <Layout>

      <formFields.EmailPassword
        loading={loading}
        confirmText="Delete"
        onSubmit={async({ email, password }) => {
          console.log(email, password);

          try {
            setLoading(true);
            await p.deleteUser({
              ...provider,
              request: { Username: email, Password: password },
            });
            onDeleted();
          } catch (e) {

            setError(e);
          } finally {
            setLoading(false);
          }
        }}
      />
            {error && <Text color='red'>{error.message}</Text>}
    </Layout>
  );
};

// with just email fields

export const ForgotPassword: React.FC<t.ForgotPasswordScreenProps> = ({
  provider,
  toConfirmForgotPassword,
  toRegister,
  toConfirmSignup
}) => {
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);

  return (
    <Layout>

      <formFields.Email
        loading={loading}
        confirmText="Reset Password"
        onSubmit={async({ email }) => {
          
          try {
            setLoading(true);
            await p.forgotPassword({
              ...provider,
              request: { Username: email },
              toConfirmSignup
            });
            toConfirmForgotPassword();
          } catch (e) {
            setError(e);
          } finally {
            setLoading(false);
          }
        }}
      />
      {error && <>
        <Label/>
        <Text color='red'>{error.message}</Text>
        <Label/>
      </>}
      <Label/>
      <YGroup space={5}  style={{width: '100%'}}>
        <buttons.Register onPress={toRegister} />
      </YGroup>
    </Layout>
  );
};

// with fixed email field and code field

export const ConfirmSignup: React.FC<t.ConfirmSignupScreenProps> = ({
  provider,
  toLogin,
}) => {
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);

  return (
    <Layout>
      <formFields.EmailCode
        loading={loading}
        confirmText="Complete Signup"
        onSubmit={async ({ email, code }) => {
          // console.log(email, code);
          try {
            setLoading(true);
            await p.confirm({
              ...provider,
              request: { Username: email, ConfirmationCode: code },
            });
            toLogin();
          } catch (e) {
            setError;
          } finally {
            setLoading(false);
          }
        }}
      />
      {error && <>
        <Label/>
        <Text color='red'>{error.message}</Text>
        <Label/>
      </>}
    </Layout>
  );
};

export const ConfirmForgotPassword: React.FC<t.ConfirmForgotPasswordProps> = ({
  toLogin,
  provider,
}) => {
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);

  return (
    <Layout>
      <formFields.EmailCodePassword
        loading={loading}
        confirmText="Complete Reset"
        onSubmit={async ({ email, code, password }) => {
          // console.log(email, code);
          try {
            setLoading(true);
            await p.confirmForgotPassword({
              ...provider,
              request: {
                Username: email,
                ConfirmationCode: code,
                Password: password,
              },
            });
            toLogin();
          } catch (e) {
            setError(e);
          } finally {
            setLoading(false);
          }
        }}
      />
        {error && <Text color='red'>{error.message}</Text>}
            
    </Layout>
  );
};
