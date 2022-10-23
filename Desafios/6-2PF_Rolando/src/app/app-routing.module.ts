import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './autenticacion/components/login/login.component';
import { RegistracionComponent } from './autenticacion/components/registracion/registracion.component';
import { PageNotFoundComponent } from './layout/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registracion', component: RegistracionComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'container',
    loadChildren: () =>
      import('src/app/layout/layout.module').then((m) => m.LayoutModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
