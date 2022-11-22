import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { Curso } from 'src/app/cursos/interfaces/curso';
import { ListaAlumnosComponent } from 'src/app/alumnos/components/lista-alumnos/lista-alumnos.component';
import { ConfirmacionDialogComponent, ConfirmacionDialogModel } from 'src/app/_shared/components/confirmacion-dialog/confirmacion-dialog.component';
import { FormCursoComponent } from '../form-curso/form-curso.component';
import { SesionService } from 'src/app/autenticacion/services/sesion.service';
import { LoaderService } from 'src/app/_shared/services/loader.service';
import { FormInscripcionComponent } from 'src/app/inscripciones/components/form-inscripcion/form-inscripcion.component';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { CursosState } from '../../state/cursos.reducer';
import { Store } from '@ngrx/store';
import { addCurso, deleteCurso, editCurso, loadCursos } from '../../state/cursos.actions';
import { selectCursos, selectCursosLoading } from '../../state/cursos.selectors';
import { InscripcionesEntidadState } from 'src/app/inscripciones/state/inscripciones-entidad.reducer';
import { addInscripcionEntidad } from 'src/app/inscripciones/state/inscripciones-entidad.actions';


@Component({
  selector: 'app-grid-cursos',
  templateUrl: './grid-cursos.component.html',
  styleUrls: ['./grid-cursos.component.css'],
})
export class GridCursosComponent implements OnInit, OnDestroy {

  cursos!: Curso[];
  errorMessage = '';
  esAdmin: boolean = false;
  suscripcion!: Subscription;

  constructor(
    private loader: LoaderService,
    private sesionService: SesionService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public activatedRoute: ActivatedRoute,
    public appService: AppService,
    private storeCursos: Store<CursosState>,
    private storeInscripcionesEntidad: Store<InscripcionesEntidadState>,
  ) {
    this.storeCursos.select(selectCursosLoading).subscribe(this.loader.controlLoader);
  }



  ngOnInit(): void {

    this.esAdmin = this.sesionService.esAdmin();
    this.getCursosData();

  }


  getCursosData() {

    this.storeCursos.dispatch(loadCursos());

    this.suscripcion = this.storeCursos.select(selectCursos).subscribe((cursos: Curso[]) => {
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
    const message = `Confirma la eliminación del curso '${curso.nombre}'?`;
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
      this.storeCursos.dispatch(deleteCurso({id: cursoId}))
    }

  }


  /* Inscripción de alumnos *************************************/
  inscripcion(curso: Curso) {
    const dialogEdit = this.dialog.open(FormInscripcionComponent, {
      width: '500px',
      data: curso,
    });

    dialogEdit.afterClosed().subscribe((inscripcion) => {
      if (inscripcion) {

        this.storeInscripcionesEntidad.dispatch(addInscripcionEntidad({inscripcion}));

        this._snackBar.open(
          'Inscripción exitosa', '',
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
    this.suscripcion.unsubscribe();
  }


}
