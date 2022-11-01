import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, map, Observable, tap } from 'rxjs';
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



  async login(email: string, password: string): Promise<Sesion> {

    // this.usuariosService.getUsuarioXemail(email).subscribe(
    // (u) => {

    //   if (u && u.password === password) {
    //     this.sesion.sesionActiva = true;
    //     this.sesion.usuarioActivo = u;
    //   }
    //   this.sesionSubject.next(this.sesion);

    // })

     const u = await this.usuariosService.getUsuarioXemail(email).toPromise();
      if (u && u.password === password) {
        this.sesion.sesionActiva = true;
        this.sesion.usuarioActivo = u;
      }
      else{
        throw('Email o contraseña incorrectos.');
      }
      this.sesionSubject.next(this.sesion);
      return this.sesion;




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
