import { ChangeDetectionStrategy, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/interfaces/usuario';




const listaUsuarios: Usuario[] = [
  {user: 'sarana', pass: 'qwerty', nombre: 'Santiago Arana', email: 'sArana@gmail.com', admin: true},
  {user: 'aperez', pass: 'qwerty', nombre: 'Andrea Perez', email: 'aPerez@gmail.com', admin: false},
];




@Component({
  selector: 'app-grid-usuarios',
  templateUrl: './grid-usuarios.component.html',
  styleUrls: ['./grid-usuarios.component.css']
})
export class GridUsuariosComponent implements OnInit {



  usuarios: Usuario[] = listaUsuarios;

  @Input() set nuevoUsuario(value: Usuario ) {

    console.log("llegó la info: ", value);

    if ( value!=undefined ){
      this.usuarios.push(value);
      this.dataSource = new MatTableDataSource(this.usuarios);
    }
 }

  displayedColumns: string[] = ['user', 'nombre', 'email', 'admin'];
  dataSource = new MatTableDataSource(this.usuarios);

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
