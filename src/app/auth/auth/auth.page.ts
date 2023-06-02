import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { camposIguaisValidator } from 'src/app/shared/validators/campos-iguais.validator';
import { minusculoValidator } from 'src/app/shared/validators/minusculo.validator';
import { soNumeros } from 'src/app/shared/validators/soNumeros.validator';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  protected formularioLogin: FormGroup = this.formBuilder.group(
    {
      cpfInput: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(11),
          minusculoValidator,
          soNumeros,
        ],
      ],
      senhaInput: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
          minusculoValidator,
        ],
      ],
    },
    {
      validators: [camposIguaisValidator],
    }
  );

  ngOnInit() {}

  protected onSubmit() {
    console.log(this.formularioLogin.value);
  }
}
