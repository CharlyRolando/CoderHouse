import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { SesionService } from 'src/app/autenticacion/services/sesion.service';
import { LoaderService } from 'src/app/_core/services/loader.service';
import { Usuario } from '../../interfaces/usuario';
import { UsuariosService } from '../../services/usuarios.service';


@Component({
  selector: 'app-detalles-usuario',
  templateUrl: './detalles-usuario.component.html',
  styleUrls: ['./detalles-usuario.component.css']
})
export class DetallesUsuarioComponent implements OnInit {

  usuario!: Usuario;
  esAdmin: boolean = false;

  constructor(
    private sesionService: SesionService,
    public appService: AppService,
    private loader: LoaderService,
    private usuariosService: UsuariosService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.esAdmin = this.sesionService.esAdmin();

    this.activatedRoute.paramMap.subscribe((parametro: any) => {

      let usuarioId: string = parametro.get('id');
      this.getUsuario(usuarioId);

    })

  }



  getUsuario(usuarioId: string) {
    this.loader.show();

    this.usuariosService.getUsuario(usuarioId)
      .subscribe( (usuario:Usuario) => {

        this.usuario = usuario;
        this.loader.hide();

      });
  }






}
