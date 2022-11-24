import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridUsuariosComponent } from './components/grid-usuarios/grid-usuarios.component';


const routes: Routes = [
  { path: '', component: GridUsuariosComponent, title: 'Usuarios' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
