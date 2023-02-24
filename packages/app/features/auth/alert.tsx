import { Dialog } from "@my/ui"; // or from 'tamagui'

type AuthAlertProps = {
  error: Error;
  dismiss: () => void;
};

export const AuthErrorAlert: React.FC<AuthAlertProps> = ({
  error,
  dismiss,
}) => {
  return (
    <Dialog  modal onOpenChange={x => {
      if (!x) {
        dismiss()
      }
    }}>
    <Dialog.Portal>
      <Dialog.Overlay />
      <Dialog.Content>
        <Dialog.Title>Error</Dialog.Title>
        <Dialog.Description>{error.message}</Dialog.Description>
        {/* <Dialog.Trigger onPress={() => dismiss()} /> */}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog>
  )
}

// type AuthSuccessAlertProps = {
//     description: string
//     dismiss: () => void
// }

// export const AuthSuccessAlert:React.FC<AuthSuccessAlertProps> = ({description, dismiss}) => (
//   <AlertDialog>
//     <AlertDialog.Trigger />
//     <AlertDialog.Portal>
//       <AlertDialog.Overlay />
//       <AlertDialog.Content>
//         <AlertDialog.Title >
//             Error
//             </AlertDialog.Title>
//         <AlertDialog.Description>
//                 {description}
//             </AlertDialog.Description>
//         <AlertDialog.Cancel onPress={dismiss}/>

//       </AlertDialog.Content>
//     </AlertDialog.Portal>
//   </AlertDialog>
// )
