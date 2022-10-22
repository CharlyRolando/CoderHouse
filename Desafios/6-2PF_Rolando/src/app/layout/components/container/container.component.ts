import { Component , AfterViewInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { BreakpointObserver} from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material/sidenav';



@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements AfterViewInit {

  @ViewChild(MatSidenav)
  sidenav! : MatSidenav;

  constructor( private observer : BreakpointObserver,
                private deteccionCambios: ChangeDetectorRef
            ) { }


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
