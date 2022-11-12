import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetallesAlumnoComponent } from './components/detalles-alumno/detalles-alumno.component';
import { FormAlumnoComponent } from './components/form-alumno/form-alumno.component';
import { GridAlumnosComponent } from './components/grid-alumnos/grid-alumnos.component';

const routes: Routes = [
  { path: '', component: GridAlumnosComponent, title: 'Alumnos' },
  { path: 'alumno/:id/detalles', component: DetallesAlumnoComponent, title: 'Detalles del alumno'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }
