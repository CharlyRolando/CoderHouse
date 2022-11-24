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
import { selectInscripcionEntidadXalumno, selectInscripcionesEntidadLoading } from 'src/app/inscripciones/state/inscripciones-entidad.selectors';
import { selectSesionActiva } from 'src/app/_core/state/sesion.selectors';
import { ConfirmacionDialogComponent, ConfirmacionDialogModel } from 'src/app/_shared/components/confirmacion-dialog/confirmacion-dialog.component';
import { LoaderService } from 'src/app/_shared/services/loader.service';
import { Alumno } from '../../interfaces/alumno';
import { AlumnosState } from '../../state/alumnos.reducer';
import { selectAlumno } from '../../state/alumnos.selectors';


@Component({
  selector: 'app-detalles-alumno',
  templateUrl: './detalles-alumno.component.html',
  styleUrls: ['./detalles-alumno.component.css']
})
export class DetallesAlumnoComponent implements OnInit, OnDestroy {

  suscripcionLoading!: Subscription;
  suscripcionAlumnos!: Subscription;

  sesion$!: Observable<Sesion>;

  alumno!: Alumno;
  inscripciones$!:Observable<InscripcionEntidad[]>;
  errorMessage: string = '';


  constructor(
    private loader: LoaderService,
    private activatedRoute: ActivatedRoute,
    public appService: AppService,
    public dialog: MatDialog,
    private storeAlumnos: Store<AlumnosState>,
    private storeInscripcionesEntidad: Store<InscripcionesEntidadState>,
    private storeSesion: Store<Sesion>,
  ) {

    this.sesion$ = this.storeSesion.select(selectSesionActiva);

    this.suscripcionLoading = this.storeInscripcionesEntidad.select(selectInscripcionesEntidadLoading).subscribe(this.loader.controlLoader);
   }


  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((parametro: any) => {

      let alumnoId: string = parametro.get('id');

      this.getAlumno(alumnoId);

      this.getInscripcionesEntidadesXAlumno(alumnoId);

    })

  }


  getAlumno(alumnoId: string) {

    this.suscripcionAlumnos = this.storeAlumnos.select(selectAlumno(alumnoId)).subscribe((alumno: Alumno) =>{
      this.alumno = alumno;
    });

  }


  getInscripcionesEntidadesXAlumno(alumnoId: string){

    this.storeInscripcionesEntidad.dispatch(loadInscripcionesEntidad());

   this.inscripciones$ = this.storeInscripcionesEntidad.select(selectInscripcionEntidadXalumno(alumnoId));

  }


  desinscribirConfirmacion(inscripcion: InscripcionEntidad) {

    const message = `Confirma la desinscripción de ${this.alumno.nombre} al curso de '${inscripcion.curso.nombre}'?`;
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


  ngOnDestroy(): void {
    this.suscripcionAlumnos.unsubscribe();
    this.suscripcionLoading.unsubscribe();
  }


}



