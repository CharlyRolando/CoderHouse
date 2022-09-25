import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/Alumno';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

public Alumnos: Array<Alumno> = [
  {
    id: 1,
    nombre: 'jorge romero',
    edad: 21,
    fechaInicio: new Date(2021, 5, 23),
    cursos:['Filosofía', 'Historia']
  },
  {
    id: 2,
    nombre: 'martin salinas',
    edad: 28,
    fechaInicio: new Date(2015, 4, 1),
    cursos:['Geología', 'Química']
  },
  {
    id: 3,
    nombre: 'olga rito',
    edad: 22,
    fechaInicio: new Date(2020, 2, 14),
    cursos:['Danza']
  },
  {
    id: 4,
    nombre: 'alina patoruti',
    edad: 21,
    fechaInicio: new Date(2021, 5, 23),
    cursos:['Química', 'Biología', 'Citología']
  },
  {
    id: 5,
    nombre: 'wilson ravena',
    edad: 21,
    fechaInicio: new Date(2018, 3, 20),
    cursos:['Idioma', 'Estadística']
  },
  {
    id: 6,
    nombre: 'rebeca lozada',
    edad: 38,
    fechaInicio: new Date(2006, 5, 20),
    cursos:['Historia']
  },
  {
    id: 7,
    nombre: 'matías luque',
    edad: 18,
    fechaInicio: new Date(2022, 7, 20),
    cursos:['Estadística', 'Historia']
  },
  {
    id: 8,
    nombre: 'sofia morando',
    edad: 25,
    fechaInicio: new Date(2019, 4, 8),
    cursos:['Filosofía']
  },
  {
    id: 9,
    nombre: 'luis petro',
    edad: 21,
    fechaInicio: new Date(2021, 10, 12),
    cursos:['Filosofía', 'Historia']
  },
  {
    id: 10,
    nombre: 'silvia martinez',
    edad: 24,
    fechaInicio: new Date(2020, 3, 2),
    cursos:['Literatura', 'Historia', 'Idioma']
  }
];



  constructor() { }

  ngOnInit(): void {
  }

}
