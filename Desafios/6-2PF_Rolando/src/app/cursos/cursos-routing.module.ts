import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from '../layout/components/container/container.component';
import { GridCursosComponent } from './components/grid-cursos/grid-cursos.component';


const routes: Routes = [
{ path: '', component: GridCursosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
