import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-programacao',
  templateUrl: './programacao.page.html',
  styleUrls: ['./programacao.page.scss'],
})
export class ProgramacaoPage implements OnInit {
  showPicker = false;
  dateValue = new Date(Date.now()).toISOString();
  formatedString = '';

  constructor() {
    this.dataFormatada();
  }

  dataFormatada() {
    this.formatedString = new Date().toLocaleString('pt-br', {
      dateStyle: 'long',
      timeStyle: 'short',
    });
  }

  dataAlterada(data: any) {
    this.dateValue = data;
    this.formatedString = new Date(data).toLocaleString('pt-br', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
    this.showPicker = false;
  }

  ngOnInit() {}
}
