import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from 'src/app/autenticacion/services/sesion.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  esAdmin: boolean = false;

  constructor(
    private sesionService: SesionService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.esAdmin = this.sesionService.esAdmin();
  }


  logOut() {
    this.sesionService.logout();
    this.router.navigate(['login']);
  }


}
