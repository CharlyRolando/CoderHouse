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

  //alumnos$!: Promise<Alumno[] | any>;
  alumnos$!: Observable<Alumno[]>;

  alumnos:Alumno[] = [];

  constructor(
    private inscripcionesService: InscripcionesService,
    private alumnosService: AlumnosService,
    @Inject(MAT_DIALOG_DATA) public cursoFiltro: Curso
  ) {}

  ngOnInit(): void {
    this.getAlumonsXcurso(this.cursoFiltro.id);
  }


  getAlumonsXcurso(cursoId: string) {

    const inscrCurso$: Promise<Inscripcion[] | undefined> =  this.inscripcionesService.getInscripcionesXcurso(cursoId).toPromise();
    const alumnos$: Promise<Alumno[] | undefined> =  this.alumnosService.getAlumnos().toPromise();
    Promise.all([inscrCurso$, alumnos$]).then((values) =>{

    const inscrCurso: Inscripcion[] | undefined = values[0];
    const alumnos: Alumno[] | undefined = values[1];
    if(inscrCurso && alumnos){
      const alumnosId: string[] = inscrCurso.map((i) => i.alumnoId);
      this.alumnos = alumnos.filter((a) => alumnosId.includes(a.id));
    }
  });

}




  ngOnDestroy(): void {
    /* TODO: el requerimiento de la entrega pide desubscribirse aquí
      pero estoy usando Promesas, por lo tanto no hago nada */
  }



}
