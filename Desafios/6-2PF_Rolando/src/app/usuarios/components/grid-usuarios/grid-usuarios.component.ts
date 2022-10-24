import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Usuario } from 'src/app/usuarios/interfaces/usuario';
import {
  ConfirmacionDialogComponent,
  ConfirmacionDialogModel,
} from 'src/app/_shared/components/confirmacion-dialog/confirmacion-dialog.component';
import { UsuariosService } from '../../services/usuarios.service';
import { FormUsuarioComponent } from '../form-usuario/form-usuario.component';

@Component({
  selector: 'app-grid-usuarios',
  templateUrl: './grid-usuarios.component.html',
  styleUrls: ['./grid-usuarios.component.css'],
})
export class GridUsuariosComponent implements OnInit, OnDestroy {
  usuarios!: Usuario[];
  usuarios$!: Observable<Usuario[]>;
  subscription!: Subscription;

  dataSource!: MatTableDataSource<Usuario>;
  displayedColumns: string[] = ['user', 'nombre', 'email', 'admin', 'acciones'];

  constructor(
    private usuariosService: UsuariosService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.usuarios$ = this.usuariosService.getUsuarios();
    this.subscription = this.usuarios$.subscribe((els) => {
      this.usuarios = els;
      this.dataSource = new MatTableDataSource(this.usuarios);
    });
  }

  addUsuario(): void {
    const dialogAlta = this.dialog.open(FormUsuarioComponent, {
      width: '50%',
    });

    dialogAlta.afterClosed().subscribe((respUsuario: Usuario) => {
      if (respUsuario) {
        this.usuariosService.addUsuario(respUsuario);
        this.dataSource.data = this.usuarios;

        this._snackBar.open(
          `El usuario '${respUsuario.user}' fue agregado exitosamente.`,
          '',
          { duration: 2000 }
        );
      }
    });
  }

  editUsuario(usuario: Usuario): void {
    const dialogEdit = this.dialog.open(FormUsuarioComponent, {
      width: '50%',
      data: usuario,
    });

    dialogEdit.afterClosed().subscribe((respUsuario: Usuario) => {
      if (respUsuario) {
        this.usuariosService.editUsuario(respUsuario);
        this.dataSource.data = this.usuarios;

        this._snackBar.open(
          `El usuario '${usuario.user}' fue modificado exitosamente.`,
          '',
          { duration: 2000 }
        );
      }
    });
  }

  deleteConfirmacion(usuario: Usuario): void {
    const message = `Confirma la eliminación de '${usuario.user}'?`;
    const dialogData = new ConfirmacionDialogModel('Eliminar usuario', message);

    const dialogRef = this.dialog.open(ConfirmacionDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.deleteUsuario(usuario);
      }
    });
  }

  deleteUsuario(usuario: Usuario): void {
    this.usuariosService.deleteUsuario(usuario.user);
    this.dataSource.data = this.usuarios;

    this._snackBar.open(
      `El usuario '${usuario.user}' fue eliminado exitosamente.`,
      '',
      { duration: 2000 }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

//@Input() usuarios: Usuario[] = [];
//   @Input() set usuarios(value: Usuario[] ) {

//     // this._categoryId = value;
//     // this.doSomething(this._categoryId);
//     console.log("llegó la info: ", value);
//     this.dataSource = value;
//  }

//  ngOnChanges(changes: SimpleChanges) {

//   //this.dataSource = new MatTableDataSource(this.usuarios);

//   //this.doSomething(changes.categoryId.currentValue);
//   // You can also use categoryId.previousValue and
//   // categoryId.firstChange for comparing old and new values

//   this.dataSource = this.usuarios;

// }

// description!: string;

// getDescription() {
//   let desc = `Version is ${this.usuarios}`;
//   return desc;
// }

// ngOnInit() {
//   this.description = this.getDescription();
// }

// constructor() {}

// ngOnChanges(changes: SimpleChanges) {

//   console.log(changes);
//   this.description = this.getDescription();

// }
