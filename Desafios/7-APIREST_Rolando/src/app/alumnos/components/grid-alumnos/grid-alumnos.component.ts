import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Alumno } from 'src/app/alumnos/interfaces/alumno';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionDialogComponent, ConfirmacionDialogModel } from 'src/app/_shared/components/confirmacion-dialog/confirmacion-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlumnosService } from '../../services/alumnos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LoaderService } from 'src/app/_shared/services/loader.service';
import { FormAlumnoComponent } from '../form-alumno/form-alumno.component';
import { SesionService } from 'src/app/autenticacion/services/sesion.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-grid-alumnos',
  templateUrl: './grid-alumnos.component.html',
  styleUrls: ['./grid-alumnos.component.css'],
})
export class GridAlumnosComponent implements OnInit, AfterViewInit, OnDestroy {

  pageTitle = 'Alumnos';
  alumnos: Alumno[] = [];
  errorMessage = '';
  suscripcion!: Subscription;
  dataSource!: MatTableDataSource<Alumno>;
  columnas: string[] = ['id', 'foto', 'nombreCompleto', 'perfil', 'sexo', 'edad', 'acciones' ];
  esAdmin: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) tbSort!: MatSort;



  constructor(
    private sesionService: SesionService,
    private loader: LoaderService,
    private alumnosService: AlumnosService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {

    this.esAdmin = this.sesionService.esAdmin();
    this.getAlumnosData();

  }


  getAlumnosData() {

    this.loader.show();
    this.suscripcion = this.alumnosService.getAlumnos()
      .subscribe({
        next: (alumnos) => {

          this.alumnos = alumnos;
          this.dataSource = new MatTableDataSource(this.alumnos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.tbSort;

        },
        error: (err) => {
          this.errorMessage = <any>err;
          this.loader.hide();
        },
        complete: () => {
          //console.info('getAlumnosData');
          this.loader.hide();
        }
      });

  }


  ngAfterViewInit() {

    /* Ordenamiento por defecto id desc */
    this.tbSort.disableClear = true;
    const sortState: Sort = {active: 'id', direction: 'desc'};
    this.tbSort.active = sortState.active;
    this.tbSort.direction = sortState.direction;
    this.tbSort.sortChange.emit(sortState);

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

          this.loader.show();
          this.alumnosService.addAlumno(alumno)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: (err) => {
                this.errorMessage = <any>err;
                this.loader.hide();
              },
              complete: () => {
                //console.info('addAlumno');
                this.loader.hide();
              }
            });

            this._snackBar.open(
          `El alumno '${alumno.nombre} ${alumno.apellido}' fue agregado exitosamente.`,  '',
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

        this.loader.show();
          this.alumnosService.editAlumno(alumno)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: (err) => {
                this.errorMessage = <any>err;
                this.loader.hide();
              },
              complete: () => {
                //console.info('editAlumno');
                this.loader.hide();
              }
            });

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

  deleteAlumno(id: string): void {
    if (id === '') {
      this.onSaveComplete();
    } else {
      this.loader.show();
      this.alumnosService.deleteAlumno(id)
        .subscribe({
          next: () => this.onSaveComplete(),
          error: (err) => {
            this.errorMessage = <any>err;
            this.loader.hide();
          },
          complete: () => {
            //console.info('deleteAlumno');
            this.loader.hide();
          }
        });

    }
  }


  onSaveComplete(): void {
    this.alumnosService.getAlumnos()
      .subscribe({
        next: (alumnos) => {

          this.alumnos = alumnos;
          this.dataSource.data = alumnos;
          this.dataSource.paginator = this.paginator;

        },
        error: (err) => this.errorMessage = <any>err,
        complete: () => console.info('onSaveComplete')
      });
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


  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }


}



/* Ordenamiento */
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


