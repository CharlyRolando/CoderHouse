import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alumno } from 'src/app/alumnos/interfaces/alumno';
import { Curso } from 'src/app/cursos/interfaces/curso';
import { AlumnosService } from 'src/app/alumnos/services/alumnos.service';
import { Observable } from 'rxjs';
import { InscripcionesService } from 'src/app/inscripciones/services/inscripciones.service';
import { Inscripcion } from 'src/app/inscripciones/interfaces/inscripcion';


@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css'],
})
export class ListaAlumnosComponent implements OnInit, OnDestroy {

  titulo: string = `Alumnos del curso de '${this.cursoFiltro.nombre}'`;
  alumnos$!: Observable<Alumno[]>;
  alumnos: Alumno[] = [];

  constructor(
    private inscripcionesService: InscripcionesService,
    private alumnosService: AlumnosService,
    @Inject(MAT_DIALOG_DATA) public cursoFiltro: Curso
  ) { }


  ngOnInit(): void {
    this.getAlumonsXcurso(this.cursoFiltro.id);
  }


  getAlumonsXcurso(cursoId: string) {

    this.alumnosService.getAlumnos().subscribe((alumnos: Alumno[]) => {
      this.inscripcionesService.getInscripcionesXcurso(cursoId)
        .subscribe((inscripciones: Inscripcion[]) => {

          const alumnosId: string[] = inscripciones.map((i) => i.alumnoId);
          this.alumnos = alumnos.filter((a) => alumnosId.includes(a.id));

        })
    });

  }




  ngOnDestroy(): void {
    /* TODO: el requerimiento de la entrega pide desubscribirse aquí
      pero estoy usando Promesas, por lo tanto no hago nada */
  }



}
