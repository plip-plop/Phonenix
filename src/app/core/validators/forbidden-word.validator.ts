import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export function forbiddenWordValidator(word: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasForbiddenWord = (control.value as string).toLowerCase().includes(word.toLowerCase());
    return hasForbiddenWord
      ? {
          forbiddenWord: {
            value: `Le mot "${word}" est interdit.`,
          },
        }
      : null;
  };
}
