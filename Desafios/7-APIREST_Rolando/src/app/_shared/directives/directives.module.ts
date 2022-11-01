import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoloNumerosDirective } from './solo-numeros.directive';
import { TemaTitulosDirective } from './tema-titulos.directive';
import { TildeBooleanoDirective } from './tilde-booleano.directive';



@NgModule({
  declarations: [
    SoloNumerosDirective,
    TemaTitulosDirective,
    TildeBooleanoDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SoloNumerosDirective,
    TemaTitulosDirective,
    TildeBooleanoDirective
  ]
})
export class DirectivesModule { }
