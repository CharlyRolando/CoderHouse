import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';
import { NotificacionDialogComponent, NotificacionDialogModel } from 'src/app/_shared/components/notificacion-dialog/notificacion-dialog.component';
import { LoaderService } from 'src/app/_shared/services/loader.service';
import { SesionService } from '../../services/sesion.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {

  showLoader!: boolean;
  fgLogin: FormGroup;
  suscripcionLoading!: Subscription;

  constructor(
    public dialog: MatDialog,
    private loader: LoaderService,
    private usuariosService: UsuariosService,
    private sesionService: SesionService,
    public appService: AppService,
    private _router: Router
  ) {
    this.fgLogin = new FormGroup({
      email: new FormControl('sArana@gmail.com'),
      password: new FormControl('!Q2w3e4r5'),
    });
  }


  ngOnInit() {
    this.suscripcionLoading = this.loader.controlLoader.subscribe((result) => {
      this.showLoader = result;
    });
  }





  login(): void {

    const email: string = this.fgLogin.value.email;
    const password: string = this.fgLogin.value.password;

    this.loader.show();
    this.usuariosService.getUsuarioXemail(email).subscribe(
      (usuario) => {

        this.loader.hide();

        if (usuario && usuario.password === password) {
          this.sesionService.sesion.sesionActiva = true;
          this.sesionService.sesion.usuarioActivo = usuario;
        }
        else {

          this.dialog.open(NotificacionDialogComponent, {
            width: '300px',
            data: new NotificacionDialogModel('LogIn', 'Ha sucedido un error. Inténtelo más tarde.')
          });

        }
        this.sesionService.sesionSubject.next(this.sesionService.sesion);
        this._router.navigate(['container'])

      });
  }


  registrarse() {
    this._router.navigate(['registracion']);
  }


  ngOnDestroy(): void {
    this.suscripcionLoading.unsubscribe();
  }



}
