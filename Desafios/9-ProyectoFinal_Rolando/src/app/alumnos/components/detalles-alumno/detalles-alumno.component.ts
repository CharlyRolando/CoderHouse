import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { SesionService } from 'src/app/autenticacion/services/sesion.service';
import { InscripcionEntidades } from 'src/app/inscripciones/interfaces/inscripcion-entidades';
import { InscripcionesService } from 'src/app/inscripciones/services/inscripciones.service';
import { ConfirmacionDialogComponent, ConfirmacionDialogModel } from 'src/app/_shared/components/confirmacion-dialog/confirmacion-dialog.component';
import { LoaderService } from 'src/app/_shared/services/loader.service';
import { Alumno } from '../../interfaces/alumno';
import { AlumnosService } from '../../services/alumnos.service';


@Component({
  selector: 'app-detalles-alumno',
  templateUrl: './detalles-alumno.component.html',
  styleUrls: ['./detalles-alumno.component.css']
})
export class DetallesAlumnoComponent implements OnInit {

  alumno!: Alumno;
  inscripciones$!:Observable<InscripcionEntidades[]>;
  suscripcion!: Subscription;
  errorMessage: string = '';
  esAdmin: boolean = false;

  constructor(
    private sesionService: SesionService,
    private alumnosService: AlumnosService,
    private inscripcionesService: InscripcionesService,
    private loader: LoaderService,
    private activatedRoute: ActivatedRoute,
    public appService: AppService,
    public dialog: MatDialog,
  ) { }


  ngOnInit(): void {
    this.esAdmin = this.sesionService.esAdmin();

    this.activatedRoute.paramMap.subscribe((parametro: any) => {

      let alumnoId: string = parametro.get('id');
      this.getInscripcionesEntidadesXAlumno(alumnoId);
      this.getAlumno(alumnoId);

    })

  }


  getAlumno(alumnoId: string) {
    this.loader.show();

    this.alumnosService.getAlumno(alumnoId)
      .subscribe( (alumno:Alumno) => {

        this.alumno = alumno;
        this.loader.hide();

      });
  }


  getInscripcionesEntidadesXAlumno(alumnoId: string){

   this.inscripciones$ = this.inscripcionesService.getInscripcionesEntidadesXalumno(alumnoId);

  }


  desinscribirConfirmacion(inscripcion: InscripcionEntidades) {

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



  // getCursosXalumno(alumnoId: string) {

  //   this.cursosService.getCursos().subscribe((cursos: Curso[]) => {
  //     this.inscripcionesService.getInscripcionesXalumno(alumnoId)
  //       .subscribe((inscripciones: Inscripcion[]) => {

  //         const cursosId: string[] = inscripciones.map((i) => i.cursoId);
  //         this.cursos = cursos.filter((c) => cursosId.includes(c.id));

  //       })
  //   });

  // }
