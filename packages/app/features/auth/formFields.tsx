// import * as fields from "./fields";
// import { Button, Label, Spinner, YStack } from "@my/ui";
// import React from "react";

// // with free text email and password fields

// type FormFieldProps = {
//   loading: boolean;
//   confirmText: string;
//   children?: React.ReactNode;
// };

// type EmailProps = FormFieldProps & {
//   onSubmit: ({ email }) => void;
// };

// export const Email: React.FC<EmailProps> = ({
//   loading,
//   confirmText,
//   onSubmit,
// }) => {
//   const [email, setEmail] = React.useState<string | undefined>();
//   const disabled = !email;
//   return (
//     <YStack width='100%' >
//       <fields.Email setEmail={setEmail} />

//       <Label/>

    
//       {disabled &&  <Label>
//         Enter a valid email
//         </Label>}

//         <Button
//        onPress={() => onSubmit({ email })}
//        icon={loading ? <Spinner /> : undefined} disabled={disabled}>
//        {confirmText}
//      </Button>
     
//     </YStack>
//   );
// };

// type EmailPasswordProps = FormFieldProps & {
//   onSubmit: ({ email, password }) => void;
// };

// export const EmailPassword: React.FC<EmailPasswordProps> = ({
//   loading,
//   confirmText,
//   onSubmit,
// }) => {
//   const [email, setEmail] = React.useState<string | undefined>();
//   const [password, setPassword] = React.useState<string | undefined>();
//   const disabled = !email || !password;
  
//   return (
//     <YStack width='100%'>

//       <fields.Email setEmail={setEmail} />
//       <fields.Password isNew={false} setPassword={setPassword} />
//       <Label />
//       <Button
//         disabled={disabled}
//         onPress={() => onSubmit({ email, password })}

//         icon={loading ? <Spinner /> : undefined} >
//           {confirmText}
//         </Button>

//     </YStack>
//   );
// };

// type EmailCodeProps = FormFieldProps & {
//   onSubmit: ({ email, code }) => void;
// };

// export const EmailCode: React.FC<EmailCodeProps> = ({
//   confirmText,
//   loading,
//   onSubmit,
// }) => {
//   const [email, setEmail] = React.useState<string | undefined>();
//   const [code, setCode] = React.useState<number | undefined>();
//   const disabled = !email || !code;

//   return (
//     <YStack width='100%'>
//       <fields.Email setEmail={setEmail} />
//       <fields.Code setCode={setCode} />
//       <Label/>

//         {!disabled && <Button
//           onPress={() => onSubmit({ email, code })}
//         icon={loading ? <Spinner /> : undefined} disabled={disabled}>
//           {confirmText}
//         </Button>}

//     </YStack>
//   );
// };

// type EmailCodePasswordProps = FormFieldProps & {
//   onSubmit: ({ email, code, password }) => void;
// };

// export const EmailCodePassword: React.FC<EmailCodePasswordProps> = ({
//   confirmText,
//   loading,
//   onSubmit,
// }) => {
//   const [email, setEmail] = React.useState<string | undefined>();
//   const [password, setPassword] = React.useState<string | undefined>();
//   const [code, setCode] = React.useState<number | undefined>();
//   const disabled = !email || !code || !password;
//   return (
//     <YStack width={'100%'}>
//       <fields.Email setEmail={setEmail} />
//       <fields.Password isNew={true} setPassword={setPassword} />
//       <fields.Code setCode={setCode} />
//       <Label/>
//        { <Button disabled={disabled} icon={loading ? <Spinner /> : undefined} 
//           onPress={() => onSubmit({ email, code, password })}
//        >
//           {confirmText}
//         </Button>
//       }

//     </YStack>
//   );
// };
