import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NotificacionDialogComponent, NotificacionDialogModel } from 'src/app/_shared/components/notificacion-dialog/notificacion-dialog.component';
import { LoaderService } from 'src/app/_shared/services/loader.service';
import { SesionService } from '../../services/sesion.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  showLoader!: boolean;
  fgLogin: FormGroup;

  constructor(
    public dialog: MatDialog,
    private loader: LoaderService,
    private sesionService: SesionService,
    private _router: Router
  ) {
    this.fgLogin = new FormGroup({
      email: new FormControl('sArana@gmail.com'),
      password: new FormControl('!Q2w3e4r5'),
    });
  }


  ngOnInit() {
    this.loader.controlLoader.subscribe((result) => {
      this.showLoader = result;
    });
  }


  login(): void {
    this.loader.show();

    this.sesionService.login(this.fgLogin.value.email, this.fgLogin.value.password).then(() =>
      this._router.navigate(['container'])
    ).catch((error) => {

      this.loader.hide();

      this.dialog.open(NotificacionDialogComponent, {
        width: '300px',
        data: new NotificacionDialogModel('LogIn', 'Ha sucedido un error. Inténtelo más tarde.')
       });

    });

  }


  registrarse() {
    this._router.navigate(['registracion']);
  }


}
