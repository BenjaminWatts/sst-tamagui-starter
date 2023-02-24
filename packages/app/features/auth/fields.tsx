import React from "react";
import { Input, Label } from "@my/ui";
import { validate } from "email-validator";
import * as labels from "./labels";

type EmailInputProps = {
  setEmail: (email: string | undefined) => void;
};

export const Email: React.FC<EmailInputProps> = ({ setEmail }) => {
  const [value, setValue] = React.useState<string|undefined>();
  return (
    <>
      <labels.Email />
      <Input
        testID="email"
        autoComplete="email"
        value={value}
        onChange={(e) => {
          const email = e.nativeEvent.text;
          setValue(email);
          if (validate(email)) {
            setEmail(email);
          } else {
            setEmail(undefined)
          }
        }}
      />
    </>
  );
};

type PasswordProps = {
  isNew: boolean;
  setPassword: (pwd: string| undefined) => void;
  // autoComplete: "password-new" | "password";
};

const isValidPassword = (pwd: string) => {
  const pattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ])[A-Za-z0-9^$*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ]{8,256}$/;
  return pattern.test(pwd);
};

export const Password: React.FC<PasswordProps> = ({
  // autoComplete,
  setPassword,
  isNew
}) => {
  const [value, setValue] = React.useState<string|undefined>();
  return (
    <>
      <labels.Password isNew={isNew} />
      <Input
        testID="password"
        autoComplete={isNew ? 'password-new' : 'password'}
        secureTextEntry={true}
        value={value}        
        onChange={(e) => {
          const pwd = e.nativeEvent.text;
          setValue(pwd);
          if (isValidPassword(pwd)) {
            setPassword(pwd);
          } else {
            setPassword(undefined)
          }
        }}
      />
      {value && !isValidPassword(value) && <Label color={'red'}>Invalid Password</Label>}
    </>
  );
};

const isValidCode = (code: string) => {
  const asNumber = Number(code)
  console.log( asNumber.toLocaleString().length)
  return asNumber.toFixed().length === 6
};

type CodeInputProps = {
  setCode: (x: number| undefined) => void;
};

export const Code: React.FC<CodeInputProps> = ({ setCode }) => {
  const [value, setValue] = React.useState("");
  return (
    <>
      <labels.Code />
      <Input
        value={value}
        onChangeText={(x) => {
          setValue(x);
          if (isValidCode(x)) {
            console.log('setting code')
            setCode(x);
          } else {
            setCode(undefined)
          }
        }}
      />
    </>
  );
};
