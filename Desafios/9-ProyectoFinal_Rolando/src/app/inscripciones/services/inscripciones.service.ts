import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Inscripcion } from '../interfaces/inscripcion';


@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  private inscripcionesUrl = environment.baseUrl + 'inscripciones';


  constructor(
    private http: HttpClient,
  ) { }


  getInscripciones(): Observable<Inscripcion[]> {

    return this.http.get<Inscripcion[]>(this.inscripcionesUrl)
      .pipe(
        catchError(this.handleError)
      );

  }


  getInscripcionesXcurso(cursoId: string): Observable<Inscripcion[]> {

    return this.getInscripciones().pipe(
        map(
          (inscripciones: Inscripcion[]) => inscripciones.filter((i: Inscripcion) => i.cursoId === cursoId)
        )
      );

  }


  getInscripcionesXalumno(alumnoId: string): Observable<Inscripcion[]> {

    return this.getInscripciones().pipe(
        map(
          (inscripciones: Inscripcion[]) => inscripciones.filter((i: Inscripcion) => i.alumnoId === alumnoId)
        )
      );

  }



  addInscripcion(inscripcion: Inscripcion): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(this.inscripcionesUrl, inscripcion)
      .pipe(
        map(() => inscripcion),
        catchError(this.handleError)
      );

  }

  editInscripcion(inscripcion: Inscripcion): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(this.inscripcionesUrl, inscripcion)
      .pipe(
        map(() => inscripcion),
        catchError(this.handleError)
      );

  }

  deleteInscripcion(id: string): Observable<{}> {
    const url = `${this.inscripcionesUrl}/${id}`;
    return this.http.delete<Inscripcion>(url)
      .pipe(
        catchError(this.handleError)
      );
  }


  deleteInscripcionesXalumno(alumnoId: string) {

    this.getInscripcionesXalumno(alumnoId).subscribe(
      (insc) => {
        insc.filter((a) => a.alumnoId == alumnoId).forEach((i) => {

          const url = `${this.inscripcionesUrl}/${i.id}`;
          return this.http.delete<Inscripcion>(url).pipe(
              catchError(this.handleError)
            );

        })
      }
    );

  }



  deleteInscripcionesXcurso(cursoId: string) {
    this.getInscripcionesXcurso(cursoId).subscribe(
      (insc) => {
        insc.filter((c) => c.cursoId == cursoId).forEach((i) => {

          const url = `${this.inscripcionesUrl}/${i.id}`;
          return this.http.delete<Inscripcion>(url).pipe(
              catchError(this.handleError)
            );

        })
      }
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





}
