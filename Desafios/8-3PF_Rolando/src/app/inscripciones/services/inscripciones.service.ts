import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Alumno } from 'src/app/alumnos/interfaces/alumno';
import { environment } from 'src/environments/environment';
import { Inscripcion } from '../interfaces/inscripcion';



@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  private inscripcionesUrl = environment.baseUrl + 'inscripciones';



  constructor(private http: HttpClient) { }



  getInscripciones(): Observable<Inscripcion[]> {

    return this.http.get<Inscripcion[]>(this.inscripcionesUrl)
    .pipe(
      catchError(this.handleError)
    );

  }


  getInscripcionesXcurso(cursoId: string): Observable<Inscripcion[]> {

    return this.http.get<Inscripcion[]>(this.inscripcionesUrl)
      .pipe(
        map(
           (inscripciones: Inscripcion[]) => inscripciones.filter((i: Inscripcion) => i.cursoId === cursoId)
          )
      );

  }




  addInscripcion(inscripcion: Inscripcion):  Observable<Inscripcion>  {

    inscripcion.id = '';
    return this.http.post<Inscripcion>(this.inscripcionesUrl, inscripcion)
      .pipe(
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
