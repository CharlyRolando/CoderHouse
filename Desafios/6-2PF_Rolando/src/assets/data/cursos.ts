import { Curso } from "../../app/cursos/interfaces/curso";

export let listaCursos: Curso[] = [
  {
    id: 1,
    nombre: 'Angular',
    logo: 'angular.png',
    comision: '110',
    profesor: 'Alberto Ramirez',
    foto: 'ramirez.png',
    fechaInicio: new Date(2023, 0, 1),
    fechaFin: new Date(2023, 1, 28),
    inscripcionAbierta: true
  },
  {
    id: 2,
    nombre: 'React',
    logo: 'react.png',
    comision: '220',
    profesor: 'Fernando Cuevas',
    foto: 'cuevas.png',
    fechaInicio: new Date(2023, 2, 10),
    fechaFin: new Date(2023, 3, 30),
    inscripcionAbierta: true
  },
  {
    id: 3,
    nombre: 'Docker',
    logo: 'docker.png',
    comision: '330',
    profesor: 'Andrea Mali',
    foto: 'mali.png',
    fechaInicio: new Date(2022, 11, 2),
    fechaFin: new Date(2022, 12, 28),
    inscripcionAbierta: true,
  },
  {
    id: 4,
    nombre: 'Node',
    logo: 'node.png',
    comision: '440',
    profesor: 'Alejandro Fonseca',
    foto: 'fonseca.png',
    fechaInicio: new Date(2022, 5, 5),
    fechaFin: new Date(2022, 6, 30),
    inscripcionAbierta: false
  },
  {
    id: 5,
    nombre: 'Redux',
    logo: 'redux.png',
    comision: '510',
    profesor: 'Raul Alfonso',
    foto: 'alfonso.png',
    fechaInicio: new Date(2022, 3, 13),
    fechaFin: new Date(2022, 4, 22),
    inscripcionAbierta: false
  },
  {
    id: 6,
    nombre: 'Vue',
    logo: 'vue.png',
    comision: '510',
    profesor: 'Gisella Benegas',
    foto: 'benegas.png',
    fechaInicio: new Date(2023, 8, 18),
    fechaFin: new Date(2023, 9, 5),
    inscripcionAbierta: true,
  },
];
