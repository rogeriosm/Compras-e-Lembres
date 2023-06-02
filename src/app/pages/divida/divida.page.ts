import { Divida } from '../../shared/model/Divida';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DividaService } from 'src/app/core/service/divida/divida.service';

@Component({
  selector: 'app-divida',
  templateUrl: './divida.page.html',
  styleUrls: ['./divida.page.scss'],
})
export class DividaPage implements OnInit {
  protected listaDivida: Array<Divida> = [];

  constructor(
    private service: DividaService,
    private formBuilder: FormBuilder
  ) {
    console.log('divida');
  }

  protected cadastraDivida: FormGroup = this.formBuilder.group({
    cpf_devedor: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(10)],
    ],
    nome_loja: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(10)],
    ],
    primeira_parcela_mes: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(10)],
    ],
    quant_vezes: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(10)],
    ],
    valor_parcela: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(10)],
    ],
  });

  ngOnInit() {
    // this.service.listarDividas().subscribe({
    //   next: (res) => (this.listaDivida = res),
    //   error: (err) => console.log(err),
    // });
  }

  public salvarDivida() {
    this.service.salvarDivida(this.cadastraDivida.value).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
    // console.log(this.cadastraDivida.value);
  }
}
