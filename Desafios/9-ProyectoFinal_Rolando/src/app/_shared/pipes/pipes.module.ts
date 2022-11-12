import { NgModule } from '@angular/core';
import { ArrayIdToNamePipe } from './array-id-to-name.pipe';
import { ComaDecimalPipe } from './coma-decimal.pipe';
import { IdToValuePipe } from './id-to-value.pipe';
import { NombreCompletoPipe } from './nombre-completo.pipe';


@NgModule({
  declarations: [
    IdToValuePipe,
    ArrayIdToNamePipe,
    NombreCompletoPipe,
    ComaDecimalPipe
  ],
  imports: [],
  exports:[
    IdToValuePipe,
    ArrayIdToNamePipe,
    NombreCompletoPipe,
    ComaDecimalPipe
  ]
})
export class PipesModule { }
