import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegistracionComponent } from './components/registracion/registracion.component';
import { SharedModule } from '../_shared/shared.module';
import { DirectivesModule } from '../_shared/directives/directives.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegistracionComponent,
  ],
  imports: [
    CommonModule,
    AutenticacionRoutingModule,
    SharedModule,
    DirectivesModule
  ],
  exports:[
    LoginComponent
  ]
})
export class AutenticacionModule { }
