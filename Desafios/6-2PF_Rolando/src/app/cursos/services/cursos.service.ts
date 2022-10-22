import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { listaCursos } from 'src/assets/data/cursos';
import { Curso } from 'src/app/models/curso';

@Injectable({
  providedIn: 'root',
})
export class CursosService {

  private cursosSubect: BehaviorSubject<Curso[]>;

  constructor() {
    this.cursosSubect = new BehaviorSubject<Curso[]>(listaCursos);
  }

  getCursos(): Observable<Curso[]> {
    return this.cursosSubect.asObservable();
  }

  getCurso(id: number): Observable<Curso[]> {
    return this.getCursos().pipe(
      map((cursos: Curso[]) => cursos.filter((curso: Curso) => curso.id === id))
    );
  }

  addCurso(curso: Curso): void {
    listaCursos.push({
      ...curso,
      id: Math.round(Math.random() * 1000),
      foto: 'empty.png',
      logo: 'empty.png',
    });

    this.cursosSubect.next(listaCursos);
  }

  editCurso(curso: Curso) {
    let indice = listaCursos.findIndex((a) => a.id == curso.id);
    listaCursos.splice(indice, 1, curso);

    this.cursosSubect.next(listaCursos);
  }

  deleteCurso(id: number): void {
    let indice = listaCursos.findIndex((a) => a.id == id);
    listaCursos.splice(indice, 1);

    this.cursosSubect.next(listaCursos);
  }


}
