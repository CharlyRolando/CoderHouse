import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
    private ref: ChangeDetectorRef
  ) {  }


  ngOnInit() {
    this.loader.controlLoader.subscribe((result) => {
      this.showLoader = result;
    });
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  enviarUsuario($event: Usuario): void {
    this.nuevoUsuario = $event;
  }

}
