import { AbstractControl, ValidationErrors } from '@angular/forms';

export function soNumeros(control: AbstractControl): ValidationErrors | null {
  const valor = control.value as number; // fazendo a conversao para numero
  if (control.value !== undefined && isNaN(control.value)) {
    return { naoNumero: true };
  }
  return null;
}
