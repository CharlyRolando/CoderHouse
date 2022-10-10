import { Curso } from 'src/app/models/curso';

export let listaCursos: Curso[] = [
  {
    id: 1,
    nombre: 'Angular',
    comision: '110',
    profesor: 'Alberto',
    fechaInicio: new Date(2022, 0, 1),
    fechaFin: new Date(2022, 1, 28),
    inscripcionAbierta: true,
    imagen: 'src/assets/1.png'
  },
  {
    id: 2,
    nombre: 'ReactJS',
    comision: '220',
    profesor: 'Fernando',
    fechaInicio: new Date(2022, 2, 1),
    fechaFin: new Date(2022, 3, 30),
    inscripcionAbierta: true,
    imagen: 'src/assets/2.png'
  },
  {
    id: 3,
    nombre: 'Web API',
    comision: '330',
    profesor: 'Arturo',
    fechaInicio: new Date(2022, 1, 1),
    fechaFin: new Date(2022, 3, 28),
    inscripcionAbierta: false,
    imagen: 'src/assets/3.png'
  },
  {
    id: 4,
    nombre: 'Docker',
    comision: '440',
    profesor: 'Alejandro',
    fechaInicio: new Date(2022, 5, 1),
    fechaFin: new Date(2022, 6, 30),
    inscripcionAbierta: false,
    imagen: 'src/assets/4.png'
  },
  {
    id: 5,
    nombre: '.Net Core',
    comision: '510',
    profesor: 'Raul',
    fechaInicio: new Date(2022, 5, 1),
    fechaFin: new Date(2022, 6, 30),
    inscripcionAbierta: false,
    imagen: 'src/assets/5.png'
  },
];
