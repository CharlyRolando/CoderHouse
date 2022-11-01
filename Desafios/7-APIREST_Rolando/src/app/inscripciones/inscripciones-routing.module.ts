import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridInscripcionesComponent } from './components/grid-inscripciones/grid-inscripciones.component';

const routes: Routes = [
  { path: '', component: GridInscripcionesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscripcionesRoutingModule { }
