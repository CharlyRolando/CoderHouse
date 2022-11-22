import { Injectable } from '@angular/core';
import { Alumno } from 'src/app/alumnos/interfaces/alumno';
import { catchError, delay, map, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class AlumnosService {

  private alumnosUrl = environment.baseUrl + 'alumnos';

  constructor(private http: HttpClient) {}

  getAlumnos(): Observable<Alumno[]> {

    delay(50000);

    return this.http.get<Alumno[]>(this.alumnosUrl)
    .pipe(
      catchError(this.handleError)
    );
  }

  getAlumno(id: string | null): Observable<Alumno> {
    if (id === '') {
      return of(this.inicializarAlumno());
    }
    const url = `${this.alumnosUrl}/${id}`;
    return this.http.get<Alumno>(url)
      .pipe(
        catchError(this.handleError)
      );
  }


  addAlumno(alumno: Alumno): Observable<Alumno | never>  {
    return this.http.post<Alumno>(this.alumnosUrl, alumno)
      .pipe(
        catchError(this.handleError)
      );
  }


  editAlumno(alumno: Alumno):  Observable<Alumno>  {
    const url = `${this.alumnosUrl}/${alumno.id}`;
    return this.http.put<Alumno>(url, alumno)
      .pipe(
        map(() => alumno),
        catchError(this.handleError)
      );
  }


  deleteAlumno(id: string): Observable<{}> {
    const url = `${this.alumnosUrl}/${id}`;
    return this.http.delete<Alumno>(url)
      .pipe(
        catchError(this.handleError)
      );
  }


  public handleError(err: any) : Observable<never> {
    let errorMessage: string;
    if(err === null || err === undefined){
      errorMessage ="nulo";
    }
    else if (err.error === undefined) {
      errorMessage = "undefined";
    }
    else if (err.error instanceof ErrorEvent) {
      errorMessage = `Ocurrió un error: ${err.error.message}`;
    }
    return throwError(() => errorMessage);
  }


  public inicializarAlumno(): Alumno {
    return {
      id: '',
      nombre: '',
      apellido: '',
      sexo: 0,
      edad: 0,
      perfil: '',
      foto: ''
    };
  }


}
