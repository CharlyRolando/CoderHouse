import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Sesion } from 'src/app/autenticacion/interfaces/sesion';
import { SesionService } from 'src/app/autenticacion/services/sesion.service';
import { selectSesionActiva } from 'src/app/_core/state/sesion.selectors';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  sesion$!: Observable<Sesion>;

  constructor(
    private sesionService: SesionService,
    private storeSesion: Store<Sesion>,
    private router: Router
  ) {
    this.sesion$ = this.storeSesion.select(selectSesionActiva);
  }


  ngOnInit(): void {

  }


  logOut() {
    this.sesionService.logout();
    this.router.navigate(['login']);
  }


}
