import { Button, Spinner } from "@my/ui";

type ActionButtonProps = {
  // onPress: () => void;
  loading: boolean; 
  onPress: () => void; 
  disabled: boolean 
};

// const commonProps = {width: '100%'}

export const Register: React.FC<ActionButtonProps> = ({ onPress }) => (
  <Button size="$3" onPress={onPress} testID="register-button">
    Register
  </Button>
);

export const Delete: React.FC<ActionButtonProps> = ({ onPress }) => (
  <Button 
    color='$red'
    size="$3" 
    onPress={onPress} 
    testID="delete-button">
    Delete
  </Button>
);

export const ForgotPassword: React.FC<ActionButtonProps> = ({ onPress }) => (
  <Button size="$3" onPress={onPress} testID="forgot-password-button">
    Forgot Password
  </Button>
);

// type ConfirmButtonProps = { };

export const Confirm = (props: ActionButtonProps) => (
  <Button
  size="$3" 
    icon={props.loading ? <Spinner /> : undefined}
    {...props} testID="confirm-button">
    Confirm
  </Button>
);

export const Reminder: React.FC<ActionButtonProps> = ({ onPress }) => (
  <Button size="$3"  onPress={onPress} testID="request-reminder-button">
    Request Reminder
  </Button>
);
