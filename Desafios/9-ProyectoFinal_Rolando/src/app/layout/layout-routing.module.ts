import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridInscripcionesComponent } from '../inscripciones/components/grid-inscripciones/grid-inscripciones.component';
import { DetallesUsuarioComponent } from '../usuarios/components/detalles-usuario/detalles-usuario.component';
import { AdminGuard } from '../_core/guards/admin.guard';
import { AutenticacionGuard } from '../_core/guards/autenticacion.guard';
import { ContainerComponent } from './components/container/container.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: 'alumnos',
        loadChildren: () => import('src/app/alumnos/alumnos.module').then((m) => m.AlumnosModule),
        canActivate: [AutenticacionGuard]
      },
      {
        path: 'cursos',
        loadChildren: () => import('src/app/cursos/cursos.module').then((m) => m.CursosModule),
        canActivate: [AutenticacionGuard]
      },
      {
        path: 'usuarios',
        loadChildren: () => import('src/app/usuarios/usuarios.module').then((m) => m.UsuariosModule),
        canActivate: [AutenticacionGuard, AdminGuard]
      },
      {
        path: 'inscripciones',
        loadChildren: () => import('src/app/inscripciones/inscripciones.module').then((m) => m.InscripcionesModule),
        canActivate: [AutenticacionGuard]
      },
      { path: 'usuarioDetalles/:id', component: DetallesUsuarioComponent, title: 'Detalles del usuario'},
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
