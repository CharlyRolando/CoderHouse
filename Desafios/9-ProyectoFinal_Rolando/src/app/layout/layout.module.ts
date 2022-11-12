import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { ContainerComponent } from './components/container/container.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainComponent } from './components/main/main.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CoreModule } from '../_core/core.module';


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
    CoreModule,
  ]
})
export class LayoutModule { }
