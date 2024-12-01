import { ValidatorFn } from '@angular/forms';

export function matchPasswordsValidator(
  passwordControlName: string,
  rePassControlName: string
): ValidatorFn {
  return (control) => {
    const passwordFormControl = control.get(passwordControlName);
    const rePasswordFormControl = control.get(rePassControlName);

    const passwordMatch =
      passwordFormControl?.value === rePasswordFormControl?.value;
    return passwordMatch ? null : { matchPasswordsValidator: true };
  };
}
