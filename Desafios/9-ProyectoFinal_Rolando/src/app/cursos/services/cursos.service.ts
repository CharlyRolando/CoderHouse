import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { Curso } from 'src/app/cursos/interfaces/curso';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})
export class CursosService {

  private cursosUrl = `${environment.baseUrl}/cursos`;

  constructor(private http: HttpClient) {}


  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.cursosUrl)
    .pipe(
      catchError(this.handleError)
    );
  }


  getCurso(id: string | null): Observable<Curso> {
    if (id === '') {
      return of(this.inicializarCurso());
    }
    return this.http.get<Curso>(`${this.cursosUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }


  addCurso(curso: Curso):  Observable<Curso>  {
    curso.id = '';
    return this.http.post<Curso>(this.cursosUrl, curso)
      .pipe(
        catchError(this.handleError)
      );
  }


  editCurso(curso: Curso): Observable<Curso>  {
    return this.http.put<Curso>(`${this.cursosUrl}/${curso.id}`, curso)
      .pipe(
        map(() => curso),
        catchError(this.handleError)
      );
  }


  deleteCurso(id: string): Observable<{}> {
    return this.http.delete<Curso>(`${this.cursosUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `Ocurrió un error: ${err.error.message}`;
    } else {
      errorMessage = `Backentd retornó código ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }

  private inicializarCurso(): Curso {
    return {
      id: '',
      nombre: '',
      logo: '',
      comision: '',
      profesor: '',
      foto: '',
      fechaInicio: new Date,
      fechaFin: new Date,
      inscripcion: true
    };
  }


}
