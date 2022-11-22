import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { sesionReducer, sesionFeatureKey } from './state/sesion.reducer';
import { SesionService } from '../autenticacion/services/sesion.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(sesionFeatureKey, sesionReducer)
  ],
  providers: [
    SesionService
  ],
})
export class CoreModule { }
