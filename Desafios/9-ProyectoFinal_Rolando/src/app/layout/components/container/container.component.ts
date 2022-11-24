import { Component , AfterViewInit, ViewChild, ChangeDetectorRef, OnInit} from '@angular/core';
import { BreakpointObserver} from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { Sesion } from 'src/app/autenticacion/interfaces/sesion';
import { Store } from '@ngrx/store';
import { selectSesionActiva } from 'src/app/_core/state/sesion.selectors';



@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit, AfterViewInit {

  sesion$!: Observable<Sesion>;

  @ViewChild(MatSidenav)
  sidenav! : MatSidenav;

  constructor(
    private observer : BreakpointObserver,
    private deteccionCambios: ChangeDetectorRef,
    private storeSesion: Store<Sesion>,
  ) {

    this.sesion$ = this.storeSesion.select(selectSesionActiva);

  }

  ngOnInit(): void {
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
