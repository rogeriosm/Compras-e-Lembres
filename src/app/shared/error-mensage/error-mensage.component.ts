import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-mensage',
  templateUrl: './error-mensage.component.html',
  styleUrls: ['./error-mensage.component.scss'],
})
export class ErrorMensageComponent implements OnInit {

  @Input() mensagem = '';
  constructor() { }

  ngOnInit() {}

}
