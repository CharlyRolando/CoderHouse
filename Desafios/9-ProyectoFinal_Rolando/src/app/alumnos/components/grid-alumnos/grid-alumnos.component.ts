import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Alumno } from 'src/app/alumnos/interfaces/alumno';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionDialogComponent, ConfirmacionDialogModel } from 'src/app/_shared/components/confirmacion-dialog/confirmacion-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LoaderService } from 'src/app/_shared/services/loader.service';
import { FormAlumnoComponent } from '../form-alumno/form-alumno.component';
import { SesionService } from 'src/app/autenticacion/services/sesion.service';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute } from '@angular/router';
import { AlumnosState } from '../../state/alumnos.reducer';
import { Store } from '@ngrx/store';
import { addAlumno, deleteAlumno, editAlumno, loadAlumnos } from '../../state/alumnos.actions';
import { selectAlumnos, selectAlumnosLoading } from '../../state/alumnos.selectors';


@Component({
  selector: 'app-grid-alumnos',
  templateUrl: './grid-alumnos.component.html',
  styleUrls: ['./grid-alumnos.component.css'],
})
export class GridAlumnosComponent implements OnInit, OnDestroy {

  esAdmin: boolean = false;
  suscripcionLoading!: Subscription;

  alumnos!: Alumno[];
  errorMessage: string = '';
  suscripcionAlumnos!: Subscription;
  dataSource!: MatTableDataSource<Alumno>;
  columnas: string[] = ['id', 'foto', 'nombreCompleto', 'perfil', 'sexo', 'edad', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) tbSort!: MatSort;



  constructor(
    private loader: LoaderService,
    private sesionService: SesionService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public activatedRoute: ActivatedRoute,
    public appService: AppService,
    private storeAlumnos: Store<AlumnosState>
  ) {
    this.suscripcionLoading = this.storeAlumnos.select(selectAlumnosLoading).subscribe(this.loader.controlLoader);
  }


  ngOnInit(): void {

    this.esAdmin = this.sesionService.esAdmin();




    this.getAlumnosData();

  }


  getAlumnosData() {

    this.storeAlumnos.dispatch(loadAlumnos());

    this.suscripcionAlumnos = this.storeAlumnos.select(selectAlumnos)
      .subscribe((alumnos: Alumno[]) => {

        this.alumnos = alumnos.map(alumnos => { return {...alumnos}; });  //para que no de error 'Sort'
        this.configurarTabla();

      });

  }



configurarTabla() {

  this.dataSource = new MatTableDataSource<Alumno>(this.alumnos);

  if(this.alumnos.length > 0 ){
  /* Ordenamiento por defecto id desc */
  this.tbSort.disableClear = true;
  const sortState: Sort = { active: 'id', direction: 'desc' };
  this.tbSort.active = sortState.active;
  this.tbSort.direction = sortState.direction;
  this.tbSort.sortChange.emit(sortState);
  this.dataSource.sort = this.tbSort;
  this.dataSource.paginator = this.paginator;
  }
}




  sortData(sort: Sort) {
    var orden = this.alumnos.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nombreCompleto': return compare(a.apellido, b.apellido, isAsc);
        default: return 0;
      }
    });
  }


  addAlumno(): void {
    const dialogAlta = this.dialog.open(FormAlumnoComponent, {
      width: '70%',
      data: '',
    });

    dialogAlta.afterClosed().subscribe((alumno: Alumno) => {
      if (alumno) {

        this.storeAlumnos.dispatch(addAlumno({ alumno }));

        this._snackBar.open(
          `El alumno '${alumno.nombre} ${alumno.apellido}' fue agregado exitosamente.`, '',
          { duration: 2000 }
        );
      }
    });
  }


  editAlumno(alumno: Alumno): void {
    const dialogEdit = this.dialog.open(FormAlumnoComponent, {
      width: '70%',
      data: alumno,
    });

    dialogEdit.afterClosed().subscribe((alumno: Alumno) => {
      if (alumno) {

        this.storeAlumnos.dispatch(editAlumno({ alumno }));

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
        this.deleteAlumno(alumno.id);
      }
    });
  }


  deleteAlumno(alumnoId: string): void {
    if (alumnoId != '') {
      this.storeAlumnos.dispatch(deleteAlumno({ id: alumnoId }));
    }
  };



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


  ngOnDestroy(): void {
    this.suscripcionAlumnos.unsubscribe();
    this.suscripcionLoading.unsubscribe();
  }


}



/* Ordenamiento */
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


