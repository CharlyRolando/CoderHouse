import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { ContainerComponent } from './components/container/container.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainComponent } from './components/main/main.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from '../_shared/shared.module';
import { UsuariosModule } from '../usuarios/usuarios.module';


@NgModule({
  declarations: [
    SidebarComponent,
    MainComponent,
    ToolbarComponent,
    PageNotFoundComponent,
    ContainerComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    UsuariosModule,
  ]
})
export class LayoutModule { }
