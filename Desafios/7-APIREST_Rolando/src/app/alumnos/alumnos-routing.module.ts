import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormAlumnoComponent } from './components/form-alumno/form-alumno.component';
import { GridAlumnosComponent } from './components/grid-alumnos/grid-alumnos.component';

const routes: Routes = [
  { path: '', component: GridAlumnosComponent},
  {
    path: 'alumnos',
    component: GridAlumnosComponent
  },
  {
    path: 'alumnos/:id/edit',
    component: FormAlumnoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }
