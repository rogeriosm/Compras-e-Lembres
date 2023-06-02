import { AbstractControl } from '@angular/forms';

export function minusculoValidator(control: AbstractControl) {
  const valor = control.value as string; // fazendo a conversao para string
  if (valor !== valor.toLowerCase()) {
    return { minusculo: true };
  } else {
    return null;
  }
}
