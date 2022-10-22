import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './components/container/container.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: 'alumnos',
        loadChildren: () =>
          import('src/app/alumnos/alumnos.module').then((m) => m.AlumnosModule),
      },
      {
        path: 'cursos',
        loadChildren: () =>
          import('src/app/cursos/cursos.module').then((m) => m.CursosModule),
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('src/app/usuarios/usuarios.module').then(
            (m) => m.UsuariosModule
          ),
      },
      { path: '', redirectTo: 'cursos', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
