import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegistracionComponent } from './components/registracion/registracion.component';
import { SharedModule } from '../_shared/shared.module';
import { DirectivesModule } from '../_shared/directives/directives.module';
import { SesionService } from './services/sesion.service';


@NgModule({
  declarations: [
    LoginComponent,
    RegistracionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DirectivesModule,
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
