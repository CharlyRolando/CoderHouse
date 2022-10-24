import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Alumno } from 'src/app/alumnos/interfaces/alumno';
import { listaAlumnos } from 'src/assets/data/alumnos';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormAlumnoComponent } from '../form-alumno/form-alumno.component';
import {
  ConfirmacionDialogComponent,
  ConfirmacionDialogModel,
} from 'src/app/_shared/components/confirmacion-dialog/confirmacion-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { listaCursos } from 'src/assets/data/cursos';
import { Curso } from 'src/app/cursos/interfaces/curso';
import { Observable, Subscription } from 'rxjs';
import { AlumnosService } from '../../services/alumnos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-grid-alumnos',
  templateUrl: './grid-alumnos.component.html',
  styleUrls: ['./grid-alumnos.component.css'],
})
export class GridAlumnosComponent implements OnInit, AfterViewInit, OnDestroy {
  alumnos!: Alumno[];
  alumnos$!: Observable<Alumno[]>;
  subscription!: Subscription;

  cursos: Curso[] = listaCursos;

  dataSource!: MatTableDataSource<Alumno>;
  columnas: string[] = [
    'id',
    'foto',
    'nombreCompleto',
    'sexo',
    'edad',
    'fechaInicio',
    'curso',
    'acciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) tbSort!: MatSort;


  constructor(
    private deteccionCambios: ChangeDetectorRef,
    private alumnosService: AlumnosService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.alumnos$ = this.alumnosService.getAlumnos();
    this.subscription = this.alumnos$.subscribe((els) => {
      this.alumnos = els;
      this.dataSource = new MatTableDataSource(this.alumnos);
    });
  }

  ngAfterViewInit() {
    /* Paginador */
    this.dataSource.paginator = this.paginator;

    /* Ordenamiento por defecto id desc */
    this.tbSort.disableClear = true;
    this.dataSource.sort = this.tbSort;
    const sortState: Sort = {active: 'id', direction: 'desc'};
    this.tbSort.active = sortState.active;
    this.tbSort.direction = sortState.direction;
    this.tbSort.sortChange.emit(sortState);

    this.deteccionCambios.detectChanges();
  }



  sortData(sort: Sort) {
    var ffff = this.alumnos.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nombreCompleto': return compare(a.apellido, b.apellido, isAsc);
        case 'curso': return compare(a.cursoId, b.cursoId, isAsc);
        default: return 0;
      }
    });
  }


  addAlumno(): void {
    const dialogAlta = this.dialog.open(FormAlumnoComponent, {
      width: '50%',
    });

    dialogAlta.afterClosed().subscribe((respAlumno: Alumno) => {
      if (respAlumno) {
        this.alumnosService.addAlumno(respAlumno);
        this.dataSource.data = this.alumnos;

        this._snackBar.open(
          `El alumno '${respAlumno.nombre} ${respAlumno.apellido}' fue agregado exitosamente.`,
          '',
          { duration: 2000 }
        );
      }
    });
  }

  editAlumno(alumno: Alumno): void {
    const dialogEdit = this.dialog.open(FormAlumnoComponent, {
      width: '50%',
      data: alumno,
    });

    dialogEdit.afterClosed().subscribe((respAlumno: Alumno) => {
      if (respAlumno) {
        this.alumnosService.editAlumno(respAlumno);
        this.dataSource.data = this.alumnos;

        this._snackBar.open(
          `El alumno '${alumno.nombre} ${alumno.apellido}' fue modificado exitosamente.`,
          '',
          { duration: 2000 }
        );
      }
    });
  }

  deleteConfirmacion(alumno: Alumno): void {
    const message = `Confirma la eliminación de '${alumno.nombre}'?`;
    const dialogData = new ConfirmacionDialogModel('Eliminar alumno', message);

    const dialogRef = this.dialog.open(ConfirmacionDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.deleteAlumno(alumno);
      }
    });
  }

  deleteAlumno(alumno: Alumno): void {
    this.alumnosService.deleteAlumno(alumno.id);
    this.dataSource.data = this.alumnos;

    this._snackBar.open(
      `El alumno '${alumno.nombre} ${alumno.apellido}' fue eliminado exitosamente.`,
      '',
      { duration: 2000 }
    );
  }

  filtrarXNombreCompleto(event: Event) {
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = function (
      alumno: Alumno,
      filtro: string
    ) {
      return (
        alumno.nombre
          .toLocaleLowerCase()
          .includes(filtro.toLocaleLowerCase()) ||
        alumno.apellido.toLocaleLowerCase().includes(filtro.toLocaleLowerCase())
      );
    };
    this.dataSource.filter = valorObtenido.trim().toLowerCase();
  }

  filtrarXCurso(event: Event) {
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = function (
      alumno: Alumno,
      filtro: string
    ) {
      var filtrolower: string = filtro.toLocaleLowerCase();
      var resultado: boolean = false;
      listaCursos.forEach((element) => {
        if (
          element.nombre.toLocaleLowerCase().includes(filtrolower) &&
          element.id == alumno.cursoId
        )
          resultado = true;
      });
      return resultado;
    };
    this.dataSource.filter = valorObtenido.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}



/* Ordenamiento */
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


