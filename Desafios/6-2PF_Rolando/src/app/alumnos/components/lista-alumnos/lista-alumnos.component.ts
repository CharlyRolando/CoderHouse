import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alumno } from 'src/app/models/alumno';
import { Curso } from 'src/app/models/curso';
import { AlumnosService } from 'src/app/alumnos/services/alumnos.service';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements OnInit , OnDestroy{

  titulo: string = `Alumnos del curso de '${this.cursoFiltro.nombre}'`;

  alumnos$!: Promise<Alumno[] | any>;

  constructor(private alumnosService:AlumnosService,
    @Inject(MAT_DIALOG_DATA) public cursoFiltro: Curso) { }


  ngOnInit(): void {

    this.alumnos$ = this.alumnosService.getAlumnosCurso(this.cursoFiltro.id);

  }


  ngOnDestroy(): void {
    /* El requerimiento de la entrega pide desubscribirse aquí
      pero estoy usando Promesas, por lo tanto no hago nada */
  }

}
