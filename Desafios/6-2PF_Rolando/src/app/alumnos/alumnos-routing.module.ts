import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridAlumnosComponent } from './components/grid-alumnos/grid-alumnos.component';

const routes: Routes = [
  { path: '', component: GridAlumnosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }
