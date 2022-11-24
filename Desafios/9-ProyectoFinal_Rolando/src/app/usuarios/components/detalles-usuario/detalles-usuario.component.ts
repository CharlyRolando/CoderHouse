import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Sesion } from 'src/app/autenticacion/interfaces/sesion';
import { selectSesionActiva } from 'src/app/_core/state/sesion.selectors';
import { LoaderService } from 'src/app/_shared/services/loader.service';
import { Usuario } from '../../interfaces/usuario';
import { loadUsuarios } from '../../state/usuarios.actions';
import { UsuariosState } from '../../state/usuarios.reducer';
import { selectUsuario, selectUsuariosLoading } from '../../state/usuarios.selectors';


@Component({
  selector: 'app-detalles-usuario',
  templateUrl: './detalles-usuario.component.html',
  styleUrls: ['./detalles-usuario.component.css']
})
export class DetallesUsuarioComponent implements OnInit, OnDestroy {

  suscripcionLoading!: Subscription;
  suscripcionUsuario!: Subscription;

  sesion$!: Observable<Sesion>;
  usuario!: Usuario;

  constructor(
    private loader: LoaderService,
    public appService: AppService,
    private activatedRoute: ActivatedRoute,
    private storeUsuarios: Store<UsuariosState>,
    private storeSesion: Store<Sesion>,
  ) {

    this.sesion$ = this.storeSesion.select(selectSesionActiva);

    this.suscripcionLoading = this.storeUsuarios.select(selectUsuariosLoading).subscribe(this.loader.controlLoader);
  }


  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((parametro: any) => {

      let usuarioId: string = parametro.get('id');
      this.getUsuario(usuarioId);

    })

  }


  getUsuario(usuarioId: string) {

    this.storeUsuarios.dispatch(loadUsuarios());
    this.suscripcionUsuario = this.storeUsuarios.select(selectUsuario(usuarioId)).subscribe((usuario: Usuario) => {
      this.usuario = usuario;
    });

  }


  ngOnDestroy(): void {
    this.suscripcionUsuario.unsubscribe();
    this.suscripcionLoading.unsubscribe();
  }


}
