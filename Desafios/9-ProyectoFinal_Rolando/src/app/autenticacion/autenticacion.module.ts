import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegistracionComponent } from './components/registracion/registracion.component';
import { CoreModule } from '../_core/core.module';
import { SesionService } from './services/sesion.service';


@NgModule({
  declarations: [
    LoginComponent,
    RegistracionComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    AutenticacionRoutingModule,
  ],
  providers: [
    SesionService
  ],
  exports:[
    LoginComponent,
    RegistracionComponent
  ]
})
export class AutenticacionModule { }
