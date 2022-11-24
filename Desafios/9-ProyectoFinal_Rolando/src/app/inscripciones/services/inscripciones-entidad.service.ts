import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, combineLatestWith, map, Observable, throwError } from 'rxjs';
import { AlumnosService } from 'src/app/alumnos/services/alumnos.service';
import { CursosService } from 'src/app/cursos/services/cursos.service';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';
import { environment } from 'src/environments/environment';
import { Inscripcion } from '../interfaces/inscripcion';
import { InscripcionEntidad } from '../interfaces/inscripcion-entidad';


@Injectable({
  providedIn: 'root'
})
export class InscripcionesEntidadService {

  private inscripcionesUrl = environment.baseUrl + 'inscripciones';


  constructor(
    private http: HttpClient,
    private alumnosService: AlumnosService,
    private cursosService: CursosService,
    private usuariosService: UsuariosService
  ) { }



  getInscripcionesEntidad(): Observable<InscripcionEntidad[]> {

    return new Observable<InscripcionEntidad[]>(

      (observador) => {

        const inscripcionesEntidad: InscripcionEntidad[] = [];

        const alumnos$ = this.alumnosService.getAlumnos();
        const cursos$ = this.cursosService.getCursos();
        const usuarios$ = this.usuariosService.getUsuarios();

        return this.http.get<Inscripcion[]>(this.inscripcionesUrl).pipe(

          combineLatestWith(alumnos$, cursos$, usuarios$)

        ).subscribe(([inscripciones, alumnos, cursos, usuarios]) => {

          inscripciones.forEach(i => {

            const insc: InscripcionEntidad = {
              id: i.id,
              alumnoId: i.alumnoId,
              cursoId: i.cursoId,
              usuarioId: i.usuarioId,
              fecha: i.fecha,
              alumno: alumnos.filter((a) => a.id == i.alumnoId)[0],
              curso: cursos.filter((c) => c.id == i.cursoId)[0],
              usuario: usuarios.filter((u) => u.id == i.usuarioId)[0],
            };

            inscripcionesEntidad.push(insc);

          });

          observador.next(inscripcionesEntidad);
          observador.complete();

        });

      });

  }


  getInscripcionesEntidadXcurso(cursoId: string): Observable<InscripcionEntidad[]> {

    return this.getInscripcionesEntidad().pipe(
      map(
        (inscripciones: InscripcionEntidad[]) => inscripciones.filter((i: InscripcionEntidad) => i.cursoId === cursoId)
      )
    );

  }


  getInscripcionesEntidadXalumno(alumnoId: string): Observable<InscripcionEntidad[]> {

    return this.getInscripcionesEntidad().pipe(
      map(
        (inscripciones: InscripcionEntidad[]) => inscripciones.filter((i: InscripcionEntidad) => i.alumnoId === alumnoId)
      )
    );

  }


  addInscripcionEntidad(inscripcion: InscripcionEntidad): Observable<InscripcionEntidad> {

    return this.http.post<Inscripcion>(this.inscripcionesUrl, inscripcion)
      .pipe(
        map(() => inscripcion),
        catchError(this.handleError)
      );

  }


  editInscripcionEntidad(inscripcion: InscripcionEntidad): Observable<InscripcionEntidad> {
    return this.http.post<InscripcionEntidad>(this.inscripcionesUrl, inscripcion)
      .pipe(
        map(() => inscripcion),
        catchError(this.handleError)
      );

  }

  deleteInscripcionEntidad(id: string): Observable<{}> {
    const url = `${this.inscripcionesUrl}/${id}`;
    return this.http.delete<InscripcionEntidad>(url)
      .pipe(
        catchError(this.handleError)
      );
  }



  deleteInscripcionesXalumno(alumnoId: string) {

    this.getInscripcionesEntidadXalumno(alumnoId).subscribe(
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
    this.getInscripcionesEntidadXcurso(cursoId).subscribe(
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
