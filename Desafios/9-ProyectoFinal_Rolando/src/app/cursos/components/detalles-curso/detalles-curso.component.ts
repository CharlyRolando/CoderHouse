import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Sesion } from 'src/app/autenticacion/interfaces/sesion';
import { InscripcionEntidad } from 'src/app/inscripciones/interfaces/inscripcion-entidad';
import { deleteInscripcionEntidad, loadInscripcionesEntidad } from 'src/app/inscripciones/state/inscripciones-entidad.actions';
import { InscripcionesEntidadState } from 'src/app/inscripciones/state/inscripciones-entidad.reducer';
import { selectInscripcionEntidadXcurso, selectInscripcionesEntidadLoading } from 'src/app/inscripciones/state/inscripciones-entidad.selectors';
import { selectSesionActiva } from 'src/app/_core/state/sesion.selectors';
import { ConfirmacionDialogComponent, ConfirmacionDialogModel } from 'src/app/_shared/components/confirmacion-dialog/confirmacion-dialog.component';
import { LoaderService } from 'src/app/_shared/services/loader.service';
import { Curso } from '../../interfaces/curso';
import { loadCursos } from '../../state/cursos.actions';
import { CursosState } from '../../state/cursos.reducer';
import { selectCurso } from '../../state/cursos.selectors';


@Component({
  selector: 'app-detalles-curso',
  templateUrl: './detalles-curso.component.html',
  styleUrls: ['./detalles-curso.component.css']
})
export class DetallesCursoComponent implements OnInit, OnDestroy {

  sesion$!: Observable<Sesion>;
  suscripcionLoading!: Subscription;

  curso!: Curso;
  inscripciones$!: Observable<InscripcionEntidad[]>;
  suscripcionCursos!: Subscription;
  errorMessage: string = '';


  constructor(
    private loader: LoaderService,
    private activatedRoute: ActivatedRoute,
    public appService: AppService,
    public dialog: MatDialog,
    private storeCursos: Store<CursosState>,
    private storeInscripcionesEntidad: Store<InscripcionesEntidadState>,
    private storeSesion: Store<Sesion>,
  ) {

    this.sesion$ = this.storeSesion.select(selectSesionActiva);

  }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((parametro: any) => {
      let cursoId: string = parametro.get('id');

      this.getCurso(cursoId);
      this.getInscripcionesEntidadesXCurso(cursoId);
    })

  }


  getCurso(cursoId: string) {

    this.storeCursos.dispatch(loadCursos());
    this.suscripcionCursos = this.storeCursos.select(selectCurso(cursoId)).subscribe((curso: Curso) => {
      this.curso = curso;
    });

  }


  getInscripcionesEntidadesXCurso(cursoId: string) {

    this.suscripcionLoading = this.storeInscripcionesEntidad.select(selectInscripcionesEntidadLoading).subscribe(this.loader.controlLoader);
    this.storeInscripcionesEntidad.dispatch(loadInscripcionesEntidad());
    this.inscripciones$ = this.storeInscripcionesEntidad.select(selectInscripcionEntidadXcurso(cursoId));

  }


  desinscribirConfirmacion(inscripcion: InscripcionEntidad) {

    const message = `Confirma la desinscripci??n de ${inscripcion.alumno.nombre} al curso de '${inscripcion.curso.nombre}'?`;
    const dialogData = new ConfirmacionDialogModel('Eliminar inscripci??n', message);

    const dialogRef = this.dialog.open(ConfirmacionDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.deleteInscripcion(inscripcion.id);
      }
    });

  }

  deleteInscripcion(inscripcionId: string): void {
    if (inscripcionId != '') {
      this.storeInscripcionesEntidad.dispatch(deleteInscripcionEntidad({ id: inscripcionId }));
    }
  }



  ngOnDestroy(): void {
    this.suscripcionCursos.unsubscribe();
    this.suscripcionLoading.unsubscribe();
  }


}
