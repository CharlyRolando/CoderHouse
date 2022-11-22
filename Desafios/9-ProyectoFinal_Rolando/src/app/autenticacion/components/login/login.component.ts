import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Usuario } from 'src/app/usuarios/interfaces/usuario';
import { loadSesionActiva } from 'src/app/_core/state/sesion.actions';
import { NotificacionDialogComponent, NotificacionDialogModel } from 'src/app/_shared/components/notificacion-dialog/notificacion-dialog.component';
import { LoaderService } from 'src/app/_shared/services/loader.service';
import { Sesion } from '../../interfaces/sesion';
import { SesionService } from '../../services/sesion.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {

  showLoader!: boolean;
  fgLogin!: FormGroup;
  suscripcionLoading!: Subscription;

  constructor(
    private loader: LoaderService,
    public appService: AppService,
    public dialog: MatDialog,
    private sesionService: SesionService,
    private _router: Router,
    private storeSesion: Store<Sesion>,
  ) {

    this.suscripcionLoading = this.loader.controlLoader.subscribe((result) => {
      this.showLoader = result;
    });

  }


  ngOnInit() {
    this.cargarFormulario();
  }


  cargarFormulario() {
    this.fgLogin = new FormGroup({
      email: new FormControl('sArana@gmail.com'),
      password: new FormControl('!Q2w3e4r5'),
    });
  }


  login(): void {

    const email: string = this.fgLogin.value.email;
    const password: string = this.fgLogin.value.password;

    this.loader.show();
    this.sesionService.login(email, password).subscribe(
      (usuario: Usuario) => {

        this.loader.hide();
        if (usuario && usuario.password === password) {
          this.sesionService.sesion.sesionActiva = true;
          this.sesionService.sesion.usuarioActivo = usuario;
          this.storeSesion.dispatch(loadSesionActiva({ usuarioActivo: usuario }));

          this._router.navigate(['container']);

        }
        else {

          this.dialog.open(NotificacionDialogComponent, {
            width: '300px',
            data: new NotificacionDialogModel('LogIn', 'eMail o contraseña incorrectos.')
          });

        }



      });
  }


  registrarse() {
    this._router.navigate(['registracion']);
  }


  ngOnDestroy(): void {
    this.suscripcionLoading.unsubscribe();
  }



}
