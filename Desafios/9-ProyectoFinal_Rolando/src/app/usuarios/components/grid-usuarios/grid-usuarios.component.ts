import { Component, Input, OnDestroy, OnInit, ɵbypassSanitizationTrustStyle } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Sesion } from 'src/app/autenticacion/interfaces/sesion';
import { Usuario } from 'src/app/usuarios/interfaces/usuario';
import { selectSesionActiva } from 'src/app/_core/state/sesion.selectors';
import { ConfirmacionDialogComponent, ConfirmacionDialogModel } from 'src/app/_shared/components/confirmacion-dialog/confirmacion-dialog.component';
import { NotificacionDialogComponent } from 'src/app/_shared/components/notificacion-dialog/notificacion-dialog.component';
import { LoaderService } from 'src/app/_shared/services/loader.service';
import { addUsuario, deleteUsuario, editUsuario, loadUsuarios } from '../../state/usuarios.actions';
import { UsuariosState } from '../../state/usuarios.reducer';
import { selectUsuarios, selectUsuariosLoading } from '../../state/usuarios.selectors';
import { FormUsuarioComponent } from '../form-usuario/form-usuario.component';


@Component({
  selector: 'app-grid-usuarios',
  templateUrl: './grid-usuarios.component.html',
  styleUrls: ['./grid-usuarios.component.css'],
})
export class GridUsuariosComponent implements OnInit, OnDestroy {

  suscripcionLoading!: Subscription;
  sesion$!: Observable<Sesion>;

  usuarios: Usuario[] = [];
  suscripcionUsuarios!: Subscription;
  errorMessage = '';
  dataSource!: MatTableDataSource<Usuario>;
  displayedColumns: string[] = ['nombre', 'email', 'direccion', 'telefono', 'admin', 'acciones'];


  constructor(
    private loader: LoaderService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public activatedRoute: ActivatedRoute,
    public appService: AppService,
    private storeUsuarios: Store<UsuariosState>,
    private storeSesion: Store<Sesion>,
  ) {
    this.sesion$ = this.storeSesion.select(selectSesionActiva);
    this.suscripcionLoading = this.storeUsuarios.select(selectUsuariosLoading).subscribe(this.loader.controlLoader);
  }


  ngOnInit() {

    this.getUsuariosData();

  }


  getUsuariosData() {

    this.storeUsuarios.dispatch(loadUsuarios());
    this.suscripcionUsuarios = this.storeUsuarios.select(selectUsuarios).subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
    });

  }



  addUsuario(): void {
    const dialogAlta = this.dialog.open(FormUsuarioComponent, {
      width: '70%',
      data: '',
    });

    dialogAlta.afterClosed().subscribe((usuario: Usuario) => {
      if (usuario) {
        this.storeUsuarios.dispatch(addUsuario({ usuario }));
        this._snackBar.open(
          `El usuario '${usuario.nombre} ${usuario.nombre}' fue agregado exitosamente.`,
          '',
          { duration: 2000 }
        );
      }
    });

  }


  editUsuario(usuario: Usuario): void {

    const dialogEdit = this.dialog.open(FormUsuarioComponent, {
      width: '70%',
      data: usuario,
    });

    dialogEdit.afterClosed().subscribe((respUsuario: Usuario) => {

      if (respUsuario) {
        if (this.validarEditAdministrador(usuario, respUsuario))
          return;

        this.storeUsuarios.dispatch(editUsuario({ usuario: respUsuario }))
        this._snackBar.open(
          `El usuario '${respUsuario.nombre} ${respUsuario.nombre}' fue modificado exitosamente.`,
          '',
          { duration: 2000 }
        );
      }
    });

  }

  validarEditAdministrador(usuario: Usuario, respUsuario: Usuario): boolean {

    const usuariosAdmin: Usuario[] = this.usuarios.filter((u) => u.admin);
    if (usuario.admin && !respUsuario.admin && usuariosAdmin.length == 1) {
      const message = `El usuario '${usuario.nombre}' es el único Administrador.\nNo se puede quitar su rol.`;
      const dialogData = new ConfirmacionDialogModel('Modificar Administrador', message);

      const dialogRef = this.dialog.open(NotificacionDialogComponent, {
        maxWidth: '400px',
        data: dialogData,
      });

      return true;
    } else {
      return false;
    }
  }


  deleteConfirmacion(usuario: Usuario): void {

    if (this.validarUltimoAdministrador(usuario))
      return;

    const message = `Confirma la eliminación de '${usuario.nombre}'?`;
    const dialogData = new ConfirmacionDialogModel('Eliminar usuario', message);

    const dialogRef = this.dialog.open(ConfirmacionDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.deleteUsuario(usuario.id);
      }
    });
  }

  validarUltimoAdministrador(usuario: Usuario): boolean {

    const usuariosAdmin: Usuario[] = this.usuarios.filter((u) => u.admin);
    if (usuario.admin && usuariosAdmin.length == 1) {
      const message = `El usuario '${usuario.nombre}' es el único Administrador.\nNo se puede eliminar.`;
      const dialogData = new ConfirmacionDialogModel('Eliminar usuario', message);

      const dialogRef = this.dialog.open(NotificacionDialogComponent, {
        maxWidth: '400px',
        data: dialogData,
      });

      return true;
    } else {
      return false;
    }
  }

  deleteUsuario(usuarioId: string): void {

    if (usuarioId != '') {
      this.storeUsuarios.dispatch(deleteUsuario({ id: usuarioId }))
    }

  }



  ngOnDestroy(): void {
    this.suscripcionUsuarios.unsubscribe();
    this.suscripcionLoading.unsubscribe();
  }


}
