import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Sesion } from 'src/app/autenticacion/interfaces/sesion';
import { SesionService } from 'src/app/autenticacion/services/sesion.service';
import { NotificacionDialogComponent, NotificacionDialogModel } from 'src/app/_shared/components/notificacion-dialog/notificacion-dialog.component';



@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {


  constructor(
    public dialog: MatDialog,
    private sesion: SesionService,
    private router: Router
  ){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.sesion.obtenerSesion().pipe(
        map((sesion: Sesion) => {
          if(sesion.usuarioActivo?.admin){
            return true;
          }else{

            const message = 'No tiene permisos para acceder a esta función.';
            const dialogData = new NotificacionDialogModel('Acceso', message);
            this.dialog.open(NotificacionDialogComponent, {
              width: '400px',
              data: dialogData,
            });

            this.router.navigate(['container']);
            return false;
          }
        })
      );
  }

}
