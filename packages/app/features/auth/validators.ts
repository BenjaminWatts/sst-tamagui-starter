export  { validate as email} from "email-validator";


export const code = (code: string | Number) => {
    const asNumber = Number(code)
    console.log( asNumber.toLocaleString().length)
    return asNumber.toFixed().length === 6
  };


export const password = (pwd: string) => {
    const pattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ])[A-Za-z0-9^$*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ]{8,256}$/;
    return pattern.test(pwd);
  };
  