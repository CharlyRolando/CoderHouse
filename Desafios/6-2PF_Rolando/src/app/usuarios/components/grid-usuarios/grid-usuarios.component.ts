import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/models/usuario';
import { listaUsuarios } from 'src/assets/data/usuarios';


@Component({
  selector: 'app-grid-usuarios',
  templateUrl: './grid-usuarios.component.html',
  styleUrls: ['./grid-usuarios.component.css']
})
export class GridUsuariosComponent implements OnInit {

  usuarios: Usuario[] = listaUsuarios;

  @Input() set nuevoUsuario(value: Usuario ) {

    if ( value!=undefined ){
      this.usuarios.push(value);
      this.dataSource = new MatTableDataSource(this.usuarios);
    }
 }

  displayedColumns: string[] = ['user', 'nombre', 'email', 'admin'];
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>(this.usuarios);

  constructor() { }

  ngOnInit(): void {
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
