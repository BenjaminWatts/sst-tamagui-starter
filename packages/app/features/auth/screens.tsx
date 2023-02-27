import * as buttons from './buttons';
import React, { useState } from 'react';
import { AuthScreenLayout as Layout } from './layout';
import * as t from './types.screens';
import * as p from './provider';
import { Separator, Text, YStack, XGroup } from '@my/ui';
import * as fields from './fields';
import * as validators from './validators';
import { YGroup } from 'tamagui'


const yStackStyles = {width: '100%', space: 3}

const FieldButtonSeparator = () => <Separator  my={20} />

const useEmailAndPassword = (): [string | undefined, string | undefined, (email: string) => void, (password: string) => void] => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const setEmailValue = (email: string) => setEmail(email);
  const setPasswordValue = (password: string) => setPassword(password);

  return [email, password, setEmailValue, setPasswordValue];
};

export const Signup: React.FC<t.SignUpScreenProps> = ({ toConfirm, provider, toForgotPassword }) => {
  const [email, password, setEmail, setPassword] = useEmailAndPassword();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);
  const disabled = !email || !password || !validators.email(email) || !validators.password(password);

  const onSubmit = async () => {
    if (!email || !password) return;
    setLoading(true);

    try {
      await p.signUp({ ...provider, request: { Username: email, Password: password } });
      toConfirm();
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title='Register'>
      <YStack style={yStackStyles}>
        <fields.Email setEmail={setEmail} />
        <fields.Password isNew={false} setPassword={setPassword} />
        <FieldButtonSeparator/>
        {error && <Text color="red">{error.message}</Text>}

        <XGroup size="$3" >
          <buttons.Confirm disabled={disabled} onPress={onSubmit} loading={loading} />
          <buttons.ForgotPassword onPress={toForgotPassword} loading={false} disabled={false} />
        </XGroup>
      </YStack>
    </Layout>
  );
};

export const Login: React.FC<t.LoginScreenProps> = ({ provider, onToken, toForgotPassword, toRegister }) => {
  const [email, password, setEmail, setPassword] = useEmailAndPassword();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!email || !password) return;
    setLoading(true);

    try {
      const token = await p.login({ ...provider, request: { Username: email, Password: password } });
      onToken(token);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title='Login'>
      <YStack style={yStackStyles}>
      <fields.Email setEmail={setEmail} />
      <fields.Password isNew={false} setPassword={setPassword} />
      <FieldButtonSeparator/>
      {error && <Text color="red">{error.message}</Text>}
      <XGroup size="$3" >
          <buttons.Confirm onPress={onSubmit} disabled={false} loading={loading} />
        <buttons.ForgotPassword onPress={toForgotPassword} disabled={false} loading={false} />
        <buttons.Register onPress={toRegister} disabled={false} loading={false} />
      </XGroup>
      </YStack>
    </Layout>
  );
};
 

export const DeleteUser: React.FC<t.DeleteUserScreenProps> = ({
  provider,
  onDeleted,
}) => {
  const [email, setEmail] = React.useState<string | undefined>();
  const [password, setPassword] = React.useState<string | undefined>();

  const [error, setError] = React.useState<Error | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);

  const disabled = !email || !password || !validators.email(email) || !validators.password(password)

  const onSubmit= async() => {
    if(!email || !password || disabled) return;

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
  }

  return (
    <Layout title='Delete Account'>
      <YStack style={yStackStyles}>
      <fields.Email setEmail={setEmail} />
      <fields.Password isNew={false} setPassword={setPassword} />
      <FieldButtonSeparator/>
      {error && <Text color='red'>{error.message}</Text>}

      <XGroup size="$3" >
        <buttons.Delete disabled={disabled} onPress={onSubmit} loading={loading} />
      </XGroup>
      </YStack>
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
  const [email, setEmail] = React.useState<string | undefined>();
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);
  const disabled = !email || !validators.email(email)

  const onSubmit = async () => {
    if(!email || disabled) return;
          
    try {
      setLoading(true);
      await p.forgotPassword({
        ...provider,
        request: { Username: email },
        toConfirmSignup // in case the user has just not completed registration
      });
      toConfirmForgotPassword();
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout title='Forgot Password'>
      <YStack style={yStackStyles}>
        <fields.Email setEmail={setEmail} />
        <FieldButtonSeparator/>
        {error && <Text color='red'>{error.message}</Text>}
        <XGroup size="$3" >
          <buttons.Confirm
            loading={loading}
            disabled={disabled}
            onPress={onSubmit} />
          <buttons.Register
            loading={false}
            disabled={false}
            onPress={toRegister} />
        </XGroup>
      </YStack>
    </Layout>
  );
};

// with fixed email field and code field

export const ConfirmSignup: React.FC<t.ConfirmSignupScreenProps> = ({
  provider,
  toLogin,
}) => {
  const [email, setEmail] = React.useState<string | undefined>();
  const [code, setCode] = React.useState<string | undefined>();
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);

  const disabled= !email || !code || !validators.email(email) || !validators.code(code)

  const onSubmit = async () => {
    if(!email || !code) return;  
    try {
      setLoading(true);
      await p.confirm({
        ...provider,
        request: { Username: email, ConfirmationCode: Number(code) },
      });
      toLogin();
    } catch (e) {
      setError;
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout title='Verify email'>
      <YStack style={yStackStyles}>
      <fields.Email setEmail={setEmail}/>
      <fields.Code setCode={setCode} />
      <FieldButtonSeparator/>
      {error && <Text color='red'>{error.message}</Text>}

      <XGroup size="$3" >
        <buttons.Confirm onPress={onSubmit} disabled={disabled} loading={loading}/>
        </XGroup>
      </YStack>
    </Layout>
  );
};

export const ConfirmForgotPassword: React.FC<t.ConfirmForgotPasswordProps> = ({
  toLogin,
  provider,
}) => {
  const [email, setEmail] = React.useState<string | undefined>();
  const [code, setCode] = React.useState<string | undefined>();
  const [password, setPassword] = React.useState<string | undefined>();
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);
  const disabled = !email || !code || !password || !validators.email(email) || !validators.code(code) || !validators.password(password)

  const onSubmit = async () => {
    if(!email || !code || !password) return;
    try {
      setLoading(true);
      await p.confirmForgotPassword({
        ...provider,
        request: {
          Username: email,
          ConfirmationCode,
          Password: password,
        },
      });
      toLogin();
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout title='Change Password'>
      <YStack style={yStackStyles}>
      <fields.Email setEmail={setEmail}/>
      <fields.Password isNew={false} setPassword={setPassword} />
      <fields.Code setCode={setCode} />
      <FieldButtonSeparator/>
      {error && <Text color='red'>{error.message}</Text>}
      <XGroup size="$3" >

      <buttons.Confirm
        disabled={disabled}
        loading={loading} 
        onPress={onSubmit} />
      </XGroup>
      </YStack>
    </Layout>
  );
};
