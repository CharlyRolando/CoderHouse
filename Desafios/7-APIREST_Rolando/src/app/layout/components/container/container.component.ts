import { Component , AfterViewInit, ViewChild, ChangeDetectorRef, OnInit} from '@angular/core';
import { BreakpointObserver} from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material/sidenav';
import { SesionService } from 'src/app/autenticacion/services/sesion.service';



@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSidenav)
  sidenav! : MatSidenav;

  esAdmin: boolean = false;

  constructor(
    private sesionService: SesionService,
    private observer : BreakpointObserver,
    private deteccionCambios: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
     this.esAdmin = this.sesionService.esAdmin();
  }


  ngAfterViewInit(): void {

    this.observer.observe(['(max-width: 800px)']).subscribe((res)=>{
      if(res.matches){
        this.sidenav.mode ='over';
        this.sidenav.close()
      }
      else{
        this.sidenav.mode = 'side';
        this.sidenav.open()
      }
    })
    this.deteccionCambios.detectChanges();
  }


}
