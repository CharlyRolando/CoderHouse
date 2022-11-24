import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* TODO: ESTE COMPONENTE NO SE SOLICITA EN LA ENTREGA FINAL */

@Component({
  selector: 'app-registracion',
  templateUrl: './registracion.component.html',
  styleUrls: ['./registracion.component.css']
})
export class RegistracionComponent implements OnInit {

  public registracionValid = true;
  public username = '';
  public password = '';

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }


  public onSubmit(): void {
    this._router.navigate(['login']);
  }


}
