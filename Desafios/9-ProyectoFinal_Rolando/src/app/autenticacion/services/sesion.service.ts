import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Usuario } from 'src/app/usuarios/interfaces/usuario';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';
import { Sesion } from '../interfaces/sesion';


@Injectable({
  providedIn: 'root',
})
export class SesionService {

  sesionSubject!: BehaviorSubject<Sesion>;

  sesion: Sesion = {
    sesionActiva: false,
  };


  constructor(private usuariosService: UsuariosService) {
    this.sesionSubject = new BehaviorSubject(this.sesion);
  }


  login(email: string, password: string): Observable<Usuario> {
   return this.usuariosService.getUsuarios().pipe(
    map((usuarios: Usuario[]) => {
      return usuarios.filter((u: Usuario) => u.email === email && u.password===password)[0]
    }));
  }


  obtenerSesion(): Observable<Sesion> {
    return this.sesionSubject.asObservable();
  }



  logout(){
    this.sesion.sesionActiva = false;
    this.sesion.usuarioActivo = undefined;
  }

}
