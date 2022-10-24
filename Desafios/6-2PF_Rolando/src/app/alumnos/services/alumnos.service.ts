import { Injectable } from '@angular/core';
import { listaAlumnos } from 'src/assets/data/alumnos';
import { Alumno } from 'src/app/alumnos/interfaces/alumno';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  promesa$!: Promise<Alumno[] | any>;

  alumnos!: Alumno[];

  constructor() {}

  /* TODO: ejemplos de Observables *************************/
  getAlumnos(): Observable<Alumno[]> {
    return of<Alumno[]>(listaAlumnos);
  }

  getAlumno(id: number): Observable<Alumno[]> {
    return this.getAlumnos().pipe(
      map((alumnos: Alumno[]) => alumnos.filter((a: Alumno) => a.id == id))
    );
  }

  addAlumno(alumno: Alumno): void {
    listaAlumnos.push({
      ...alumno,
      id: Math.round(Math.random() * 1000),
      foto: 'empty.png',
    });
  }

  editAlumno(alumno: Alumno): void {
    let indice = listaAlumnos.findIndex((a: Alumno) => a.id == alumno.id);
    listaAlumnos.splice(indice, 1, alumno);
  }

  deleteAlumno(id: number): void {
    let indice = listaAlumnos.findIndex((a: Alumno) => a.id == id);
    listaAlumnos.splice(indice, 1);
  }
  /****************************************************/

  /* TODO: ejemplo de Promise ***********************/
  getAlumnosCurso(cursoId: number): Promise<Alumno[] | any> {
    return new Promise((resolve, reject) => {
      const alumnosCurso: Alumno[] = listaAlumnos.filter(
        (a: Alumno) => a.cursoId == cursoId
      );
      resolve(alumnosCurso);
    });
  }
  /****************************************************/
}

// if(alumnosCurso.length > 0){
//   resolve(alumnosCurso);
// }else{
//   reject({
//     codigo: 0,
//     mensaje: 'No hay alumnos.'
//   });
// }
