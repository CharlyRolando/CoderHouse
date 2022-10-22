import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ConfirmacionDialogComponent } from './shared/components/confirmacion-dialog/confirmacion-dialog.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { LayoutModule } from '@angular/cdk/layout';
import { AlumnosModule } from './alumnos/alumnos.module';
import { CursosModule } from './cursos/cursos.module';
import { PageNotFoundComponent } from './layout/components/page-not-found/page-not-found.component';
import { ToolbarComponent } from './layout/components/toolbar/toolbar.component';
import { MainComponent } from './layout/components/main/main.component';
import { SidebarComponent } from './layout/components/sidebar/sidebar.component';
import { ContainerComponent } from './layout/components/container/container.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
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
