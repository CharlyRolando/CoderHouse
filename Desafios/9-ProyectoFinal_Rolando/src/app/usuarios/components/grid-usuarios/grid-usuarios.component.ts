import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { SesionService } from 'src/app/autenticacion/services/sesion.service';
import { Usuario } from 'src/app/usuarios/interfaces/usuario';
import { ConfirmacionDialogComponent, ConfirmacionDialogModel } from 'src/app/_shared/components/confirmacion-dialog/confirmacion-dialog.component';
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

  esAdmin: boolean = false;
  suscripcionLoading!: Subscription;

  usuarios: Usuario[] = [];
  suscripcionUsuarios!: Subscription;
  errorMessage = '';
  dataSource!: MatTableDataSource<Usuario>;
  displayedColumns: string[] = ['nombre', 'email', 'direccion', 'telefono', 'admin', 'acciones'];




  constructor(
    private loader: LoaderService,
    private sesionService: SesionService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public activatedRoute: ActivatedRoute,
    public appService: AppService,
    private storeUsuarios: Store<UsuariosState>
  ) {
    this.suscripcionLoading = this.storeUsuarios.select(selectUsuariosLoading).subscribe(this.loader.controlLoader);
   }


  ngOnInit() {

    this.esAdmin = this.sesionService.esAdmin();

    this.getUsuariosData();
  }


  getUsuariosData() {

    this.storeUsuarios.dispatch(loadUsuarios());

    this.suscripcionUsuarios = this.storeUsuarios.select(selectUsuarios).subscribe((usuarios: Usuario[]) => {
      this.dataSource = new MatTableDataSource<Usuario>(usuarios);
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

    dialogEdit.afterClosed().subscribe((usuario: Usuario) => {

      if (usuario) {

        this.storeUsuarios.dispatch(editUsuario({ usuario }))

        this._snackBar.open(
          `El usuario '${usuario.nombre} ${usuario.nombre}' fue modificado exitosamente.`,
          '',
          { duration: 2000 }
        );
      }
    });
  }


  deleteConfirmacion(usuario: Usuario): void {
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


  deleteUsuario(usuarioId: string): void {

    if (usuarioId != '') {
      this.storeUsuarios.dispatch(deleteUsuario({id: usuarioId}))
    }

  }



  ngOnDestroy(): void {
    this.suscripcionUsuarios.unsubscribe();
    this.suscripcionLoading.unsubscribe();
  }


}
