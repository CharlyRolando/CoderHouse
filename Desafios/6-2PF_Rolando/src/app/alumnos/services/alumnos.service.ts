import { Injectable } from '@angular/core';
import { listaAlumnos } from 'src/assets/data/alumnos';
import { Alumno } from 'src/app/models/alumno';


@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  promesa$!:Promise<Alumno[] | any>;

  alumnos!: Alumno[];

  constructor() { }

  getAlumnosCurso(cursoId: number): Promise<Alumno[] | any>{

    return new Promise((resolve, reject) => {

      const alumnosCurso: Alumno[] = listaAlumnos.filter((alumno: Alumno) => alumno.cursoId == cursoId)

      if(alumnosCurso.length > 0){

        resolve(alumnosCurso);

      }else{
        // reject({
        //   codigo: 0,
        //   mensaje: 'No hay alumnos.'
        // });
      }
    });

  }




}
