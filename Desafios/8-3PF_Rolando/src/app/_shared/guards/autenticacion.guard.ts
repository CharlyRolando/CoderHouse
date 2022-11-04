import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Sesion } from 'src/app/autenticacion/interfaces/sesion';
import { SesionService } from 'src/app/autenticacion/services/sesion.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionGuard implements CanActivate {



  constructor(
    private sesion: SesionService,
    private router: Router
  ) {}




  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.sesion.obtenerSesion().pipe(
      map((sesion: Sesion) => {
        if (sesion.sesionActiva) {
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }
      })
    );
  }


}
