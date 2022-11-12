import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, combineLatest, combineLatestWith, filter, forkJoin, map, mergeMap, Observable, of, throwError } from 'rxjs';
import { Alumno } from 'src/app/alumnos/interfaces/alumno';
import { AlumnosService } from 'src/app/alumnos/services/alumnos.service';
import { Curso } from 'src/app/cursos/interfaces/curso';
import { CursosService } from 'src/app/cursos/services/cursos.service';
import { Usuario } from 'src/app/usuarios/interfaces/usuario';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';
import { environment } from 'src/environments/environment';
import { InscripcionEntidades } from '../interfaces/inscripcion-entidades';
import { Inscripcion } from '../interfaces/inscripcion';



@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  private inscripcionesUrl = environment.baseUrl + 'inscripciones';


  constructor(
    private http: HttpClient,
    private cursosService: CursosService,
    private alumnosService: AlumnosService,
    private usuariosService: UsuariosService
  ) { }


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


  getInscripcionesXalumno(alumnoId: string): Observable<Inscripcion[]> {

    return this.http.get<Inscripcion[]>(this.inscripcionesUrl)
      .pipe(
        map(
          (inscripciones: Inscripcion[]) => inscripciones.filter((i: Inscripcion) => i.alumnoId === alumnoId)
        )
      );

  }

  getInscripcionesEntidades(): Observable<InscripcionEntidades[]> {

    return this.getInscripcionesEntidad(this.getInscripciones());

  }

  getInscripcionesEntidadesXalumno(alumnoId: string): Observable<InscripcionEntidades[]> {

    return this.getInscripcionesEntidad(this.getInscripcionesXalumno(alumnoId));

  }

  getInscripcionesEntidadesXcurso(cursoId: string): Observable<InscripcionEntidades[]> {

    return this.getInscripcionesEntidad(this.getInscripcionesXcurso(cursoId));

  }

  getInscripcionesEntidad( inscripciones$:Observable<Inscripcion[]> ): Observable<InscripcionEntidades[]> {

    return new Observable<InscripcionEntidades[]>(

      (observador) => {

        let inscripcionAlumnoArray: InscripcionEntidades[] = [];

        const alumnos$ = this.alumnosService.getAlumnos();
        const cursos$ = this.cursosService.getCursos();
        const usuarios$ = this.usuariosService.getUsuarios();
        //const inscripciones$ = this.getInscripciones();

        inscripciones$.pipe(

          combineLatestWith(alumnos$, cursos$, usuarios$)

        ).subscribe(([inscripciones, alumnos, cursos, usuarios]) => {

          inscripciones.forEach(i => {

            const insc: InscripcionEntidades = {
              id: i.id,
              fechaInscripcion: i.fecha,
              alumno: alumnos.filter((a) => a.id == i.alumnoId)[0],
              curso: cursos.filter((c) => c.id == i.cursoId)[0],
              usuario: usuarios.filter((u) => u.id == i.usuarioId)[0],
            };

            inscripcionAlumnoArray.push(insc);

          });

          observador.next(inscripcionAlumnoArray);
          observador.complete();

        });

      });

  }



  limpiarInscripciones() {

    this.getInscripcionesEntidades()
      .subscribe((inscripciones: InscripcionEntidades[]) => {

        inscripciones.forEach(i => {

          if (i.curso === undefined) {
            // this.deleteInscripcion(i.id);
            console.log('inscripcion.id = ' + i.id);

          }

        });

      });


  }


  addInscripcion(inscripcion: Inscripcion): Observable<Inscripcion> {

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
