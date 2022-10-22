import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './_shared/shared.module';
import { ConfirmacionDialogComponent } from './_shared/components/confirmacion-dialog/confirmacion-dialog.component';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { LayoutModule } from '@angular/cdk/layout';
import { AlumnosModule } from './alumnos/alumnos.module';
import { CursosModule } from './cursos/cursos.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    LayoutModule,
    AutenticacionModule,
    AlumnosModule,
    CursosModule
  ],
  providers: [],
  entryComponents: [ConfirmacionDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
