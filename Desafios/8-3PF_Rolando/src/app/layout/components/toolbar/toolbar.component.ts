import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Sesion } from 'src/app/autenticacion/interfaces/sesion';
import { SesionService } from 'src/app/autenticacion/services/sesion.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidebar: EventEmitter<void> = new EventEmitter();

  sesion$!: Observable<Sesion>;
  public app_name:string = environment.app_name;
  esAdmin: boolean = false;

  constructor(
    private sesionService: SesionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.esAdmin = this.sesionService.esAdmin();
    this.sesion$ = this.sesionService.obtenerSesion();
  }

  sidebarToggle(): void {
    this.toggleSidebar.emit();
  }

  logout() {
    this.sesionService.logout();
    this.router.navigate(['login']);
  }

}
