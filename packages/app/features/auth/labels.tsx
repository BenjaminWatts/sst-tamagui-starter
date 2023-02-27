import React from "react";
import { Label } from "@my/ui";

const labels = {
  email: "Email",
  newPassword: 'New Password',
  password: "Password",
  code: "Confirmation Code",
};

export const Email = () => <Label testID="data-email-label">{labels.email}</Label>;
export const Password = (props: {isNew: boolean}) => (
  <Label testID="data-password-label">{props.isNew ? labels.newPassword: labels.password}</Label>
);
export const Code = () => <Label testID="data-code-label">{labels.code}</Label>;
