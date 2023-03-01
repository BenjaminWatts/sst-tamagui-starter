import React from "react";
import { Input, Label } from "@my/ui";
// import { validate } from "email-validator";
import * as labels from "./labels";
import * as validators from "./validators";

type EmailInputProps = {
  setEmail: (email: string | undefined) => void;
};

export const Email: React.FC<EmailInputProps> = ({ setEmail }) => {
  const [value, setValue] = React.useState<string|undefined>();
  return (
    <>
      <labels.Email />
      <Input
        testID="data-email-input"
        autoComplete="email"
        // width='100%'

        value={value}
        onChange={(e) => {
          const email = e.nativeEvent.text.toLowerCase()
          setValue(email);
          if (validators.email(email)) {
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
        testID="data-password-input"
        autoComplete={isNew ? 'password-new' : 'password'}
        secureTextEntry={true}
        value={value}        
        onChange={(e) => {
          const pwd = e.nativeEvent.text;
          setValue(pwd);
          if (validators.password(pwd)) {
            setPassword(pwd);
          } else {
            setPassword(undefined)
          }
        }}
      />
      {value && !validators.password(value) && <Label color={'red'}>Invalid Password</Label>}
    </>
  );
};



type CodeInputProps = {
  setCode: (x: string| undefined) => void;
};

export const Code: React.FC<CodeInputProps> = ({ setCode }) => {
  const [value, setValue] = React.useState("");
  return (
    <>
      <labels.Code />
      <Input
        testID="data-code-input"
        value={value}
        onChangeText={(x) => {
          setValue(x);
          // console.log(x)
          if (validators.code(x)) {
            console.log('setting code ' + x)
            var myformat = new Intl.NumberFormat('en-GB', { 
              minimumIntegerDigits: 6,
              
            })
            const formatted = myformat.format(Number(x)).replace(',', '')
            setCode(formatted);
          } else {
            console.log('not valid')
            setCode(undefined)
          }
        }}
      />
    </>
  );
};
