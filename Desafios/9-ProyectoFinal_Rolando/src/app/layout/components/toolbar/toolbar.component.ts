import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Sesion } from 'src/app/autenticacion/interfaces/sesion';
import { SesionService } from 'src/app/autenticacion/services/sesion.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidebar: EventEmitter<void> = new EventEmitter();

  sesion$!: Observable<Sesion>;


  constructor(
    private sesionService: SesionService,
    public appService: AppService,
    private router: Router,
  ) {

    this.sesion$ = this.sesionService.obtenerSesion();

  }


  ngOnInit(): void {
  }

  sidebarToggle(): void {
    this.toggleSidebar.emit();
  }

  logout() {
    this.sesionService.logout();
    this.router.navigate(['login']);
  }

}
