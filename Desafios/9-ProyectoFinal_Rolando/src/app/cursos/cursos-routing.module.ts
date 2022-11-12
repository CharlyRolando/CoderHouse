import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetallesCursoComponent } from './components/detalles-curso/detalles-curso.component';
import { GridCursosComponent } from './components/grid-cursos/grid-cursos.component';


const routes: Routes = [
  { path: '', component: GridCursosComponent, title: 'Cursos' },
  { path: 'curso/:id/detalles', component: DetallesCursoComponent, title: 'Detalles de curso' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
