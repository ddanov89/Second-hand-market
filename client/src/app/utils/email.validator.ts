import { ValidatorFn } from '@angular/forms';

export function emailValidator(domains: string[]): ValidatorFn {
  const domainString = domains.join('|');
  const regExp = new RegExp(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

  return (control) => {
    const isInvalid = control.value === '' || regExp.test(control.value);
    
    return isInvalid ? null : { emailValidator: true };
  };
}
