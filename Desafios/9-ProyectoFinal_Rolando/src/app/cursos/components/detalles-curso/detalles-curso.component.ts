import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { SesionService } from 'src/app/autenticacion/services/sesion.service';
import { InscripcionEntidad } from 'src/app/inscripciones/interfaces/inscripcion-entidad';
import { InscripcionesService } from 'src/app/inscripciones/services/inscripciones.service';
import { ConfirmacionDialogComponent, ConfirmacionDialogModel } from 'src/app/_shared/components/confirmacion-dialog/confirmacion-dialog.component';
import { LoaderService } from 'src/app/_shared/services/loader.service';
import { Curso } from '../../interfaces/curso';
import { CursosService } from '../../services/cursos.service';
import { loadCursos } from '../../state/cursos.actions';
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
    private sesionService: SesionService,
    private inscripcionesService: InscripcionesService,
    private loader: LoaderService,
    private activatedRoute: ActivatedRoute,
    public appService: AppService,
    public dialog: MatDialog,
    private storeCursos: Store<CursosState>
  ) { }

  ngOnInit(): void {
    this.esAdmin = this.sesionService.esAdmin();

    this.activatedRoute.paramMap.subscribe((parametro: any) => {

      let cursoId: string = parametro.get('id');
      this.getInscripcionesEntidadesXCurso(cursoId);
      this.getCurso(cursoId);

    })
  }


  getCurso(cursoId: string) {

    this.storeCursos.select(selectCurso(cursoId)).subscribe((curso: Curso) =>{
      this.curso = curso;
    });

  }


  getInscripcionesEntidadesXCurso(cursoId: string){

   this.inscripciones$ = this.inscripcionesService.getInscripcionesEntidadesXcurso(cursoId);

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

      this.loader.show();
      this.inscripcionesService.deleteInscripcion(inscripcionId)
        .subscribe({
          error: (err) => {
            this.errorMessage = <any>err;
            this.loader.hide();
          },
          complete: () => {
            this.loader.hide();
          }
        });

    }
  }



}
