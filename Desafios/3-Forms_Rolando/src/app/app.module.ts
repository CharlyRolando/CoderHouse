import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { MainComponent } from './components/layout/main/main.component';
import { ToolbarComponent } from './components/layout/toolbar/toolbar.component';

import { LoginComponent } from './components/login/login.component';

import { FormAlumnoComponent } from './components/alumnos/form-alumno/form-alumno.component';
import { GridAlumnosComponent } from './components/alumnos/grid-alumnos/grid-alumnos.component';
import { FormUsuarioComponent } from './components/usuarios/form-usuario/form-usuario.component';
import { GridUsuariosComponent } from './components/usuarios/grid-usuarios/grid-usuarios.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainComponent,
    ToolbarComponent,
    LoginComponent,
    FormAlumnoComponent,
    GridAlumnosComponent,
    FormUsuarioComponent,
    GridUsuariosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
