import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/usuarios/interfaces/usuario';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  nuevoUsuario!:Usuario;

  constructor() { }

  ngOnInit(): void {
  }

  enviarUsuario($event: Usuario): void {
    this.nuevoUsuario = $event;
  }

}
