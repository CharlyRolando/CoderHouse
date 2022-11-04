import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { SesionService } from 'src/app/autenticacion/services/sesion.service';
import { Usuario } from 'src/app/usuarios/interfaces/usuario';
import { ConfirmacionDialogComponent, ConfirmacionDialogModel } from 'src/app/_shared/components/confirmacion-dialog/confirmacion-dialog.component';
import { LoaderService } from 'src/app/_shared/services/loader.service';
import { UsuariosService } from '../../services/usuarios.service';
import { FormUsuarioComponent } from '../form-usuario/form-usuario.component';


@Component({
  selector: 'app-grid-usuarios',
  templateUrl: './grid-usuarios.component.html',
  styleUrls: ['./grid-usuarios.component.css'],
})
export class GridUsuariosComponent implements OnInit, OnDestroy {

  pageTitle:string = "Usuarios";
  usuarios!: Usuario[];
  usuarios$!: Observable<Usuario[]>;
  suscripcion!: Subscription;
  errorMessage = '';
  dataSource!: MatTableDataSource<Usuario>;
  displayedColumns: string[] = ['nombre', 'email', 'direccion', 'telefono', 'admin', 'acciones'];
  esAdmin: boolean = false;



  constructor(
    private sesionService: SesionService,
    private loader: LoaderService,
    private usuariosService: UsuariosService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}


  ngOnInit() {
    this.esAdmin = this.sesionService.esAdmin();
    this.getUsuariosData();
  }


  getUsuariosData() {

    this.loader.show();
    this.suscripcion = this.usuariosService.getUsuarios()
      .subscribe({
        next: (usuarios) => {
          this.usuarios = usuarios;
          this.dataSource = new MatTableDataSource(this.usuarios);
        },
        error: (err) => {
          this.errorMessage = <any>err;
          this.loader.hide();
        },
        complete: () => {
          //console.info('getUsuariosData');
          this.loader.hide();
        }
      });

  }



  addUsuario(): void {
    const dialogAlta = this.dialog.open(FormUsuarioComponent, {
      width: '70%',
      data: '',
    });

    dialogAlta.afterClosed().subscribe((user: Usuario) => {

      if (user) {
          this.loader.show();
          this.usuariosService.addUsuario(user)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: (err) => {
                this.errorMessage = <any>err;
                this.loader.hide();
              },
              complete: () => {
                //console.info('addUsuario');
                this.loader.hide();
              }
            });

            this._snackBar.open(
          `El usuario '${user.nombre} ${user.nombre}' fue agregado exitosamente.`,
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

    dialogEdit.afterClosed().subscribe((user: Usuario) => {

      if (user) {

        this.loader.show();
          this.usuariosService.editUsuario(user)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: (err) => {
                this.errorMessage = <any>err;
                this.loader.hide();
              },
              complete: () => {
                //console.info('editUsuario');
                this.loader.hide();
              }
            });

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


  deleteUsuario(id: string): void {

    if (id === '') {
      this.onSaveComplete();
    } else {
      this.loader.show();
      this.usuariosService.deleteUsuario(id)
        .subscribe({
          next: () => this.onSaveComplete(),
          error: (err) => {
            this.errorMessage = <any>err;
            this.loader.hide();
          },
          complete: () => {
            //console.info('deleteUsuario');
            this.loader.hide();
          }
        });
    }

  }


  onSaveComplete(): void {

    this.usuariosService.getUsuarios()
      .subscribe({
        next: (usuarios) => {
          this.usuarios = usuarios;
          this.dataSource.data = usuarios;
        },
        error: (err) => this.errorMessage = <any>err,
        complete: () => console.info('onSaveComplete')
      });

  }


  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }


}
