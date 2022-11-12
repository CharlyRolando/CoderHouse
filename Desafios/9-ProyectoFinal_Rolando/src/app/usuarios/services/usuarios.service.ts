import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})
export class UsuariosService {

  private usuariosUrl = environment.baseUrl + 'usuarios';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.usuariosUrl)
    .pipe(
      catchError(this.handleError)
    );
  }

  getUsuario(id: string | null): Observable<Usuario> {
    if (id === '') {
      return of(this.inicializarUsuario());
    }
    const url = `${this.usuariosUrl}/${id}`;
    return this.http.get<Usuario>(url)
      .pipe(
        catchError(this.handleError)
      );
  }


  getUsuarioXemail(email: string | null): Observable<Usuario | undefined> {
    if (email === '') {
      return of(undefined);
    }
    return this.http.get<Usuario[]>(this.usuariosUrl)
      .pipe(
        map((usuarios: Usuario[]) => usuarios.find((u: Usuario) => u.email === email))
      );
  }


  addUsuario(usuario: Usuario):  Observable<Usuario>  {
    usuario.id = '';
    return this.http.post<Usuario>(this.usuariosUrl, usuario)
      .pipe(
        catchError(this.handleError)
      );
  }


  editUsuario(usuario: Usuario):  Observable<Usuario>  {

    return this.http.put<Usuario>(`${this.usuariosUrl}/${usuario.id}`, usuario)
      .pipe(
        map(() => usuario),
        catchError(this.handleError)
      );
  }

  deleteUsuario(id: string): Observable<{}> {

    return this.http.delete<Usuario>(`${this.usuariosUrl}/${id}`)
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


  private inicializarUsuario(): Usuario {
    return {
      id: '',
      email:'',
      password:'',
      nombre:'',
      direccion:'',
      telefono:'',
      admin: false
    };
  }


}
