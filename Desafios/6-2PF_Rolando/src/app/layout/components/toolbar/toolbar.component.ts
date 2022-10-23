import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidebar: EventEmitter<void> = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  sidebarToggle(): void{
     this.toggleSidebar.emit();
  }

  login(){
    this.router.navigate(['login']);
  }

  registracion(){
    this.router.navigate(['registracion']);
  }

  logout(){

    //TODO: aquí hay que matar la sesión
    this.router.navigate(['login']);

  }


}
