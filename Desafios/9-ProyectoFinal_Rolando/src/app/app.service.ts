import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  public app_name: string = environment.app_name;
  public titulo: string = this.app_name;

  constructor(public activatedRoute: ActivatedRoute,) { };

  public setTitulo(titulo: string | undefined) {
    if (titulo) this.titulo = titulo;
  }


}
