import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { Curso } from 'src/app/cursos/interfaces/curso';
import { ListaAlumnosComponent } from 'src/app/alumnos/components/lista-alumnos/lista-alumnos.component';
import { ConfirmacionDialogComponent, ConfirmacionDialogModel } from 'src/app/_shared/components/confirmacion-dialog/confirmacion-dialog.component';
import { FormCursoComponent } from '../form-curso/form-curso.component';
import { LoaderService } from 'src/app/_shared/services/loader.service';
import { FormInscripcionComponent } from 'src/app/inscripciones/components/form-inscripcion/form-inscripcion.component';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { CursosState } from '../../state/cursos.reducer';
import { Store } from '@ngrx/store';
import { addCurso, deleteCurso, editCurso, loadCursos } from '../../state/cursos.actions';
import { selectCursos, selectCursosLoading } from '../../state/cursos.selectors';
import { InscripcionesEntidadState } from 'src/app/inscripciones/state/inscripciones-entidad.reducer';
import { addInscripcionEntidad, deleteInscripcionEntidad } from 'src/app/inscripciones/state/inscripciones-entidad.actions';
import { Sesion } from 'src/app/autenticacion/interfaces/sesion';
import { selectSesionActiva } from 'src/app/_core/state/sesion.selectors';
import { InscripcionesService } from 'src/app/inscripciones/services/inscripciones.service';
import { Inscripcion } from 'src/app/inscripciones/interfaces/inscripcion';


@Component({
  selector: 'app-grid-cursos',
  templateUrl: './grid-cursos.component.html',
  styleUrls: ['./grid-cursos.component.css'],
})
export class GridCursosComponent implements OnInit, OnDestroy {

  sesion$!: Observable<Sesion>;
  suscripcionLoading!: Subscription;

  cursos!: Curso[];
  errorMessage = '';

  suscripcionCursos!: Subscription;

  constructor(
    private loader: LoaderService,
    private inscripcionesService: InscripcionesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public activatedRoute: ActivatedRoute,
    public appService: AppService,
    private storeCursos: Store<CursosState>,
    private storeInscripcionesEntidad: Store<InscripcionesEntidadState>,
    private storeSesion: Store<Sesion>,
  ) {

    this.sesion$ = this.storeSesion.select(selectSesionActiva);
    this.suscripcionLoading = this.storeCursos.select(selectCursosLoading).subscribe(this.loader.controlLoader);

  }



  ngOnInit(): void {

    this.getCursosData();

  }


  getCursosData() {

    this.storeCursos.dispatch(loadCursos());
    this.suscripcionCursos = this.storeCursos.select(selectCursos).subscribe((cursos: Curso[]) => {
      this.cursos = cursos;
    });
  }


  addCurso(): void {
    const dialogAlta = this.dialog.open(FormCursoComponent, {
      width: '70%',
      data: '',
    });

    dialogAlta.afterClosed().subscribe((curso: Curso) => {
      if (curso) {

        this.storeCursos.dispatch(addCurso({ curso }));

        this._snackBar.open(
          `El curso '${curso.nombre}' fue agregado exitosamente.`,
          '',
          { duration: 2000 }
        );
      }
    });
  }


  editCurso(curso: Curso): void {
    const dialogEdit = this.dialog.open(FormCursoComponent, {
      width: '70%',
      data: curso,
    });

    dialogEdit.afterClosed().subscribe((curso: Curso) => {
      if (curso) {

        this.storeCursos.dispatch(editCurso({ curso }));

        this._snackBar.open(
          `El curso '${curso.nombre}' fue modificado exitosamente.`,
          '',
          { duration: 2000 }
        );
      }
    });
  }


  deleteConfirmacion(curso: Curso): void {
    const message = `Confirma la eliminaci??n del curso '${curso.nombre}'?`;
    const dialogData = new ConfirmacionDialogModel('Eliminar curso', message);

    const dialogRef = this.dialog.open(ConfirmacionDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.deleteCurso(curso.id);
      }
    });
  }


  deleteCurso(cursoId: string): void {

    if (cursoId != '') {

      /* primero elimino todas las inscripciones del curso a eliminar */
      this.inscripcionesService.getInscripcionesXcurso(cursoId).subscribe(
        (inscripciones: Inscripcion[]) => {
          //console.log('cantidad de inscripciones: ', inscripciones.length);
          inscripciones.forEach(
            (inscripcion) => {
              //console.log('delete inscr: ', inscripcion.id)
              this.storeInscripcionesEntidad.dispatch(deleteInscripcionEntidad({ id: inscripcion.id }));
            }
          )
        }
      );

      this.storeCursos.dispatch(deleteCurso({ id: cursoId }));

    }
  }


  /* Inscripci??n de alumnos *************************************/
  inscripcion(curso: Curso) {
    const dialogEdit = this.dialog.open(FormInscripcionComponent, {
      width: '500px',
      data: curso,
    });

    dialogEdit.afterClosed().subscribe((inscripcion) => {
      if (inscripcion) {

        this.storeInscripcionesEntidad.dispatch(addInscripcionEntidad({ inscripcion }));

        this._snackBar.open(
          'Inscripci??n exitosa', '',
          { duration: 2000 }
        );
      }
    });
  }

  verAlumnos(curso: Curso) {
    const dialogAlta = this.dialog.open(ListaAlumnosComponent, {
      width: '500px',
      data: curso,
    });
  }
  /**********************************************************************************/

  ngOnDestroy() {
    this.suscripcionCursos.unsubscribe();
    this.suscripcionLoading.unsubscribe();
  }


}
