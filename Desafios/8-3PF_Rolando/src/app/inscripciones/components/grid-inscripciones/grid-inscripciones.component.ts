import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from 'src/app/alumnos/interfaces/alumno';
import { AlumnosService } from 'src/app/alumnos/services/alumnos.service';
import { SesionService } from 'src/app/autenticacion/services/sesion.service';
import { Curso } from 'src/app/cursos/interfaces/curso';
import { CursosService } from 'src/app/cursos/services/cursos.service';
import { Usuario } from 'src/app/usuarios/interfaces/usuario';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';
import { ConfirmacionDialogComponent, ConfirmacionDialogModel } from 'src/app/_shared/components/confirmacion-dialog/confirmacion-dialog.component';
import { LoaderService } from 'src/app/_shared/services/loader.service';
import { AlumnoInscripto } from '../../interfaces/alumno-inscripto';
import { Inscripcion } from '../../interfaces/inscripcion';
import { InscripcionesService } from '../../services/inscripciones.service';


@Component({
  selector: 'app-grid-inscripciones',
  templateUrl: './grid-inscripciones.component.html',
  styleUrls: ['./grid-inscripciones.component.css']
})
export class GridInscripcionesComponent implements OnInit, OnDestroy {

  pageTitle: string = "Alumnos inscriptos";
  errorMessage = '';
  esAdmin: boolean = true;
  alumnosInscriptos: AlumnoInscripto[] = [];
  dataSource!: MatTableDataSource<AlumnoInscripto>;
  columnas: string[] = ['id', 'nombreAlumno', 'nombreCurso', 'nombreUsuario', 'fechaInscripto', 'acciones' ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) tbSort!: MatSort;


  constructor(
    private loader: LoaderService,
    private sesionService: SesionService,
    private inscripcionesService: InscripcionesService,
    private cursosService: CursosService,
    private alumnosService: AlumnosService,
    private usuariosService: UsuariosService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }



  ngOnInit(): void {

    this._snackBar
    this.esAdmin = this.sesionService.esAdmin();
    this.getAlumnosInscriptos();

  }


  getAlumnosInscriptos() {

    this.loader.show();
    this.alumnosInscriptos = [];

    const alumnos$: Promise<Alumno[] | undefined> = this.alumnosService.getAlumnos().toPromise();
    const cursos$: Promise<Curso[] | undefined> = this.cursosService.getCursos().toPromise();
    const usuarios$: Promise<Usuario[] | undefined> = this.usuariosService.getUsuarios().toPromise();
    const inscripciones$: Promise<Inscripcion[] | undefined> = this.inscripcionesService.getInscripciones().toPromise();

    Promise.all([alumnos$, cursos$, usuarios$, inscripciones$]).then((values) => {

      const alumnos: Alumno[] | undefined = values[0];
      const cursos: Curso[] | undefined = values[1];
      const usuarios: Usuario[] | undefined = values[2];
      const inscripciones: Inscripcion[] | undefined = values[3];

      if (inscripciones && alumnos && cursos && usuarios) {
        inscripciones.forEach(inscripcion => {

          const alumno: Alumno | undefined = alumnos.find((a) => a.id === inscripcion.alumnoId)
          const curso: Curso | undefined = cursos.find((c) => c.id === inscripcion.cursoId)
          const usuario: Usuario | undefined = usuarios.find((u) => u.id === inscripcion.usuarioId)

          if (alumno && curso && usuario) {

            const inscripto: AlumnoInscripto = {
              id: inscripcion.id,
              nombreAlumno: `${alumno.nombre} ${alumno.apellido}`,
              nombreCurso: curso.nombre,
              nombreUsuario: usuario.nombre,
              fechaInscripto: inscripcion.fecha
            };
            if (inscripto) {
              this.alumnosInscriptos.push(inscripto);
            }
          }
        });

        this.dataSource = new MatTableDataSource(this.alumnosInscriptos);
        /* Ordenamiento por defecto id desc */
        this.tbSort.disableClear = true;
        const sortState: Sort = {active: 'id', direction: 'desc'};
        this.tbSort.active = sortState.active;
        this.tbSort.direction = sortState.direction;
        this.tbSort.sortChange.emit(sortState);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.tbSort;

      }
    });

    this.loader.hide();

  }



  sortData(e: any) {

  }


  filtrarXAlumno(event: Event) {
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = function (
      alumnoInscripto: AlumnoInscripto,
      filtro: string
    ) {
      return (
        alumnoInscripto.nombreAlumno
          .toLocaleLowerCase()
          .includes(filtro.toLocaleLowerCase()));
    };
    this.dataSource.filter = valorObtenido.trim().toLowerCase();
  }


  filtrarXCurso(event: Event) {
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = function (
      alumnoInscripto: AlumnoInscripto,
      filtro: string
    ) {
      return (
        alumnoInscripto.nombreCurso
          .toLocaleLowerCase()
          .includes(filtro.toLocaleLowerCase()));
    };
    this.dataSource.filter = valorObtenido.trim().toLowerCase();
  }



  deleteConfirmacion(inscripto: AlumnoInscripto): void {
    const message = `Confirma la eliminación de la inscripción de '${inscripto.nombreAlumno}' al curso de '${inscripto.nombreCurso}'?`;
    const dialogData = new ConfirmacionDialogModel('Eliminar inscripción', message);

    const dialogRef = this.dialog.open(ConfirmacionDialogComponent, {
      maxWidth: '500px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.deleteInscripcion(inscripto.id);
      }
    });
  }

  deleteInscripcion(id: string): void {
    if (id === '') {
      this.onSaveComplete();
    } else {
      this.loader.show();
      this.inscripcionesService.deleteInscripcion(id)
        .subscribe({
          next: () => this.onSaveComplete(),
          error: (err) => {
            this.errorMessage = <any>err;
            this.loader.hide();
          },
          complete: () => {
            //console.info('deleteInscripcion');
            this.loader.hide();
          }
        });

    }
  }


  onSaveComplete(): void {
    this.inscripcionesService.getInscripciones()
      .subscribe({
        next: (inscriptos) => {

          this.getAlumnosInscriptos();

        },
        error: (err) => this.errorMessage = <any>err,
        complete: () => console.info('onSaveComplete')
      });
  }


  ngOnDestroy(): void {

  }


}








  // getAlumnosInscriptos() {
  //   this.loader.show();
  //   this.alumnosInscriptos=[];
  //   this.inscripcionesService.getInscripciones().subscribe({
  //     next: (inscripciones: Inscripcion[]) => {
  //       if(inscripciones.length > 0){
  //       inscripciones.map((i) => {
  //         const alumno$: Promise<Alumno | undefined> = this.alumnosService.getAlumno(i.alumnoId).toPromise();
  //         const curso$: Promise<Curso | undefined> = this.cursosService.getCurso(i.cursoId).toPromise();
  //         const usuario$: Promise<Usuario | undefined> = this.usuariosService.getUsuario(i.usuarioId).toPromise();
  //         Promise.all([alumno$, curso$, usuario$]).then( (values) => {
  //           const alumno: Alumno | undefined = values[0];
  //           const curso: Curso | undefined = values[1];
  //           const usuario: Usuario | undefined = values[2];
  //           if (alumno && curso && usuario) {
  //             const inscripto: AlumnoInscripto = {
  //               id: i.id,
  //               nombreAlumno: `${alumno.nombre} ${alumno.apellido}`,
  //               nombreCurso: curso.nombre,
  //               nombreUsuario: usuario.nombre,
  //               fechaInscripto: i.fecha
  //             };
  //             if (inscripto) {
  //               this.alumnosInscriptos.push(inscripto);
  //             }
  //           }
  //           this.dataSource = new MatTableDataSource(this.alumnosInscriptos);
  //           this.loader.hide();
  //         });
  //       })
  //     }else{
  //       this.dataSource = new MatTableDataSource(this.alumnosInscriptos);
  //       this.loader.hide();
  //     }
  //     }
  //   });
  // }





