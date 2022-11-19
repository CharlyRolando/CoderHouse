import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppService } from 'src/app/app.service';
import { SesionService } from 'src/app/autenticacion/services/sesion.service';
import { Usuario } from '../../interfaces/usuario';
import { loadUsuarios } from '../../state/usuarios.actions';
import { UsuariosState } from '../../state/usuarios.reducer';
import { selectUsuario } from '../../state/usuarios.selectors';


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
    private activatedRoute: ActivatedRoute,
    private storeUsuarios: Store<UsuariosState>
  ) { }

  ngOnInit(): void {

    this.esAdmin = this.sesionService.esAdmin();

    this.activatedRoute.paramMap.subscribe((parametro: any) => {

      let usuarioId: string = parametro.get('id');
      this.getUsuario(usuarioId);

    })

  }



  getUsuario(usuarioId: string) {

    this.storeUsuarios.select(selectUsuario(usuarioId)).subscribe((usuario: Usuario) =>{
      this.usuario = usuario;
    });

  }






}
