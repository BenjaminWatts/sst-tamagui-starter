import { Button } from "@my/ui";

type ActionButtonProps = {
  onPress: () => void;
};

// const commonProps = {width: '100%'}

export const Register: React.FC<ActionButtonProps> = ({ onPress }) => (
  <Button onPress={onPress} testID="register-button">
    Register
  </Button>
);

export const Delete: React.FC<ActionButtonProps> = ({ onPress }) => (
  <Button onPress={onPress} testID="delete-button">
    Delete
  </Button>
);

export const ForgotPassword: React.FC<ActionButtonProps> = ({ onPress }) => (
  <Button width="100%" onPress={onPress} testID="forgot-password-button">
    Forgot Password
  </Button>
);

type ConfirmButtonProps = { disabled: boolean };

export const Confirm = (props: ConfirmButtonProps) => (
  <Button {...props} testID="confirm-button">
    Confirm
  </Button>
);

export const Reminder: React.FC<ActionButtonProps> = ({ onPress }) => (
  <Button onPress={onPress} testID="request-reminder-button">
    Request Reminder
  </Button>
);
