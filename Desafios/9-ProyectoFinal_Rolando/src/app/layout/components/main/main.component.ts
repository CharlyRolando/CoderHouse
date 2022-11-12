import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Usuario } from 'src/app/usuarios/interfaces/usuario';
import { LoaderService } from 'src/app/_shared/services/loader.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterContentChecked {

  nuevoUsuario!:Usuario;
  showLoader!: boolean;

  constructor(
    private loader: LoaderService,
    private ref: ChangeDetectorRef,
    public appService: AppService
  ) {  }


  ngOnInit() {
    this.loader.controlLoader.subscribe((result) => {
      this.showLoader = result;
    });
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  onActivate($event:any){
    $event.activatedRoute.title.subscribe((titulo:any)=>{
      if(titulo) this.appService.setTitulo(titulo);
    });
  }

  enviarUsuario($event: Usuario): void {
    this.nuevoUsuario = $event;
  }

}
