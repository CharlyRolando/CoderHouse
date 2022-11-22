import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { SesionService } from 'src/app/autenticacion/services/sesion.service';
import { InscripcionEntidad } from 'src/app/inscripciones/interfaces/inscripcion-entidad';
import { deleteInscripcionEntidad, loadInscripcionesEntidad } from 'src/app/inscripciones/state/inscripciones-entidad.actions';
import { InscripcionesEntidadState } from 'src/app/inscripciones/state/inscripciones-entidad.reducer';
import { selectInscripcionEntidadXcurso, selectInscripcionesEntidadLoading } from 'src/app/inscripciones/state/inscripciones-entidad.selectors';
import { ConfirmacionDialogComponent, ConfirmacionDialogModel } from 'src/app/_shared/components/confirmacion-dialog/confirmacion-dialog.component';
import { LoaderService } from 'src/app/_shared/services/loader.service';
import { Curso } from '../../interfaces/curso';
import { CursosState } from '../../state/cursos.reducer';
import { selectCurso } from '../../state/cursos.selectors';


@Component({
  selector: 'app-detalles-curso',
  templateUrl: './detalles-curso.component.html',
  styleUrls: ['./detalles-curso.component.css']
})
export class DetallesCursoComponent implements OnInit {

  curso!: Curso;
  inscripciones$!:Observable<InscripcionEntidad[]>;
  suscripcion!: Subscription;
  errorMessage: string = '';
  esAdmin: boolean = false;

  constructor(
    private loader: LoaderService,
    private sesionService: SesionService,
    private activatedRoute: ActivatedRoute,
    public appService: AppService,
    public dialog: MatDialog,
    private storeCursos: Store<CursosState>,
    private storeInscripcionesEntidad: Store<InscripcionesEntidadState>,
  ) {
    this.storeInscripcionesEntidad.select(selectInscripcionesEntidadLoading).subscribe(this.loader.controlLoader);
   }

  ngOnInit(): void {
    this.esAdmin = this.sesionService.esAdmin();

    this.activatedRoute.paramMap.subscribe((parametro: any) => {

      let cursoId: string = parametro.get('id');

      this.getCurso(cursoId);

      this.getInscripcionesEntidadesXCurso(cursoId);
    })
  }


  getCurso(cursoId: string) {

    this.storeCursos.select(selectCurso(cursoId)).subscribe((curso: Curso) =>{
      this.curso = curso;
    });

  }


  getInscripcionesEntidadesXCurso(cursoId: string){

   this.storeInscripcionesEntidad.dispatch(loadInscripcionesEntidad());

   this.inscripciones$ = this.storeInscripcionesEntidad.select(selectInscripcionEntidadXcurso(cursoId));

  }


  desinscribirConfirmacion(inscripcion: InscripcionEntidad) {

    const message = `Confirma la desinscripción de ${inscripcion.alumno.nombre} al curso de '${inscripcion.curso.nombre}'?`;
    const dialogData = new ConfirmacionDialogModel('Eliminar inscripción', message);

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



}
