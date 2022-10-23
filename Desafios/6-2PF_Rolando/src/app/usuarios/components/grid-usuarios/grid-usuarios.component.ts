import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Usuario } from 'src/app/usuarios/interfaces/usuario';
import { UsuariosService } from '../../services/usuarios.service';

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
    this.subscription = this.usuarios$.subscribe((els) => {this.usuarios = els;
      this.dataSource = new MatTableDataSource(this.usuarios);
    });
  }


  addUsuario(): void {}

  editUsuario(usuario: Usuario): void {}

  deleteConfirmacion(usuario: Usuario): void {}



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
