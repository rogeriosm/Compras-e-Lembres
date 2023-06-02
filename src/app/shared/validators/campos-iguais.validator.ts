import { AbstractControl, ValidationErrors } from '@angular/forms';

export function camposIguaisValidator(
  formGroup: AbstractControl
): ValidationErrors | null {
  const cpf = formGroup.get('cpfInput')?.value ?? ''; // se nao tiver valor passe uma string vazia
  const senha = formGroup.get('senhaInput')?.value ?? '';
  if (cpf.trim() + senha.trim()) {
    return cpf !== senha ? null : { objIguais: true };
  } else {
    return null;
  }
}

/**
 * https://angular.io/guide/form-validation
 * https://www.bezkoder.com/angular-14-form-validation/
 * https://stackoverflow.com/questions/65155217/formbuilder-group-is-deprecated
 *
 */
