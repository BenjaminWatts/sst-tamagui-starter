import React from "react";
import { Input, Label } from "@my/ui";
import { validate } from "email-validator";

const labels = {
  email: "Email",
  newPassword: 'New Password',
  password: "Password",
  code: "Confirmation Code",
};

export const Email = () => <Label testID="email-label">{labels.email}</Label>;
export const Password = (props: {isNew: boolean}) => (
  <Label testID="password-label">{props.isNew ? labels.newPassword: labels.password}</Label>
);
export const Code = () => <Label testID="code-label">{labels.code}</Label>;
