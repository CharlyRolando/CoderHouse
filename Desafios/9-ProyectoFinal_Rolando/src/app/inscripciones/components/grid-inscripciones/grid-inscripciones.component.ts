import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ConfirmacionDialogComponent, ConfirmacionDialogModel } from 'src/app/_shared/components/confirmacion-dialog/confirmacion-dialog.component';
import { LoaderService } from 'src/app/_shared/services/loader.service';
import { InscripcionEntidad } from '../../interfaces/inscripcion-entidad';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { InscripcionesEntidadState } from '../../state/inscripciones-entidad.reducer';
import { deleteInscripcionEntidad, loadInscripcionesEntidad } from '../../state/inscripciones-entidad.actions';
import { selectInscripcionesEntidad, selectInscripcionesEntidadLoading } from '../../state/inscripciones-entidad.selectors';
import { Sesion } from 'src/app/autenticacion/interfaces/sesion';
import { selectSesionActiva } from 'src/app/_core/state/sesion.selectors';


@Component({
  selector: 'app-grid-inscripciones',
  templateUrl: './grid-inscripciones.component.html',
  styleUrls: ['./grid-inscripciones.component.css']
})
export class GridInscripcionesComponent implements OnInit, OnDestroy {

  errorMessage = '';
  sesion$!: Observable<Sesion>;

  suscripcionLoading!: Subscription;
  suscripcionInscripciones!: Subscription;

  inscripciones!: InscripcionEntidad[];

  dataSource!: MatTableDataSource<InscripcionEntidad>;
  columnas: string[] = ['id', 'nombreAlumno', 'nombreCurso', 'comisionCurso', 'fecha', 'nombreUsuario', 'acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) tbSort!: MatSort;


  constructor(
    private loader: LoaderService,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    public appService: AppService,
    private storeInscripcionesEntidad: Store<InscripcionesEntidadState>,
    private storeSesion: Store<Sesion>,
  ) {

    this.sesion$ = this.storeSesion.select(selectSesionActiva);

  }



  ngOnInit(): void {

    this.getInscripciones();

  }


  getInscripciones() {

    this.suscripcionLoading = this.storeInscripcionesEntidad.select(selectInscripcionesEntidadLoading).subscribe(this.loader.controlLoader);
    this.storeInscripcionesEntidad.dispatch(loadInscripcionesEntidad());

    this.suscripcionInscripciones = this.storeInscripcionesEntidad.select(selectInscripcionesEntidad)
      .subscribe((inscripciones: InscripcionEntidad[]) => {

        this.inscripciones = inscripciones.map(inscripciones => { return { ...inscripciones }; });
        this.configurarTabla();

      });

  }




  configurarTabla() {

    this.dataSource = new MatTableDataSource(this.inscripciones);

    if (this.inscripciones.length > 0) {
      /* Ordenamiento por defecto id desc */
      this.tbSort.disableClear = true;
      const sortState: Sort = { active: 'id', direction: 'asc' };
      this.tbSort.active = sortState.active;
      this.tbSort.direction = sortState.direction;
      this.tbSort.sortChange.emit(sortState);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.tbSort;
    }
  }


  sortData(sort: Sort) {
    var orden = this.inscripciones.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nombreAlumno': return compare(a.alumno.apellido, b.alumno.apellido, isAsc);
        case 'nombreCurso': return compare(a.curso.nombre, b.curso.nombre, isAsc);
        case 'comisionCurso': return compare(a.curso.comision, b.curso.comision, isAsc);
        case 'nombreUsuario': return compare(a.usuario.nombre, b.usuario.nombre, isAsc);
        default: return 0;
      }
    });
  }


  filtrarXAlumno(event: Event) {
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = function (
      alumnoInscripto: InscripcionEntidad,
      filtro: string
    ) {
      return (
        `${alumnoInscripto.alumno.apellido} ${alumnoInscripto.alumno.nombre}`
          .toLocaleLowerCase()
          .includes(filtro.toLocaleLowerCase()));
    };
    this.dataSource.filter = valorObtenido.trim().toLowerCase();
  }


  filtrarXCurso(event: Event) {
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = function (
      alumnoInscripto: InscripcionEntidad,
      filtro: string
    ) {
      return (
        alumnoInscripto.curso.nombre
          .toLocaleLowerCase()
          .includes(filtro.toLocaleLowerCase()));
    };
    this.dataSource.filter = valorObtenido.trim().toLowerCase();
  }



  deleteConfirmacion(inscripto: InscripcionEntidad): void {
    const message = `Confirma la eliminación de la inscripción de '${inscripto.alumno.nombre}' al curso de '${inscripto.curso.nombre}'?`;
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

  deleteInscripcion(inscripcionId: string): void {
    if (inscripcionId != '') {
      this.storeInscripcionesEntidad.dispatch(deleteInscripcionEntidad({ id: inscripcionId }));
    }
  }


  ngOnDestroy(): void {
    this.suscripcionInscripciones.unsubscribe();
    this.suscripcionLoading.unsubscribe();
  }


}


/* Ordenamiento */
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}



