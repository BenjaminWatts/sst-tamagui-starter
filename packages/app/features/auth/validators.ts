export  { validate as email} from "email-validator";


export const code = (code: string | Number) => {
    return code.toString().length === 6 && Number(code)
  };


export const password = (pwd: string) => {
    const pattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ])[A-Za-z0-9^$*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ]{8,256}$/;
    return pattern.test(pwd);
  };
  