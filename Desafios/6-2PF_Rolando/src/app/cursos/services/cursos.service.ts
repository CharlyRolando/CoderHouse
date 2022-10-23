import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { listaCursos } from 'src/assets/data/cursos';
import { Curso } from 'src/app/cursos/interfaces/curso';

@Injectable({
  providedIn: 'root',
})
export class CursosService {

  private cursosSubect: BehaviorSubject<Curso[]>;

  constructor() {
    this.cursosSubect = new BehaviorSubject<Curso[]>(listaCursos);
  }


  /* TODO: ejemplos de BehaviorSubject *************************/
  getCursos(): Observable<Curso[]> {
    return this.cursosSubect.asObservable();
  }

  getCurso(id: number): Observable<Curso[]> {
    return this.getCursos().pipe(
      map((cs: Curso[]) => cs.filter((c: Curso) => c.id === id))
    );
  }

  addCurso(curso: Curso): void {
    listaCursos.push({
      ...curso,
      id: Math.round(Math.random() * 1000),
      foto: 'empty.png',
      logo: 'empty.png',
    });
  }

  editCurso(curso: Curso): void {
    let indice = listaCursos.findIndex((c) => c.id == curso.id);
    listaCursos.splice(indice, 1, curso);
  }

  deleteCurso(id: number): void {
    let indice = listaCursos.findIndex((c) => c.id == id);
    listaCursos.splice(indice, 1);
  }
  /**************************************************************/


}
