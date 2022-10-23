import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { listaUsuarios } from 'src/assets/data/usuarios';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor() { }


getUsuarios(): Observable<Usuario[]>{
  return of<Usuario[]>(listaUsuarios);
}

getUsuario(user: string): Observable<Usuario[]>{
  return this.getUsuarios().pipe(
    map((us: Usuario[]) => us.filter((u: Usuario) => u.user == user))
    );
}

addUsuario(usuario: Usuario): void{
  listaUsuarios.push({
    ...usuario,
    pass: 'qwerty'
  });
}

editUsuario(usuario: Usuario): void{
  let indice = listaUsuarios.findIndex((u) => u.user == usuario.user);
  listaUsuarios.splice(indice, 1, usuario);
}

deleteUsuario(user: string): void {
  let indice = listaUsuarios.findIndex((u) => u.user == user);
  listaUsuarios.splice(indice, 1);
}

}
