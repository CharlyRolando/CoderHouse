import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridUsuariosComponent } from './components/grid-usuarios/grid-usuarios.component';


const routes: Routes = [
  { path: '', component: GridUsuariosComponent, title:'Usuarios'},
  // { path: 'usuarioDetalles/:id', component: DetallesUsuarioComponent, title: 'Detalles del usuario'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
