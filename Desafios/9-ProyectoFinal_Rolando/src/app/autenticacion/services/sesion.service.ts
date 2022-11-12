import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, map, Observable, of, tap } from 'rxjs';
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


  obtenerSesion(): Observable<Sesion> {
    return this.sesionSubject.asObservable();
  }

  esAdmin():boolean{
    return this.sesion.usuarioActivo?.admin || false;
  }

  logout(){
    this.sesion.sesionActiva = false;
    this.sesion.usuarioActivo = undefined;
  }

}
