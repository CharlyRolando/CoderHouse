import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ConfirmacionDialogComponent } from './components/confirmacion-dialog/confirmacion-dialog.component';


@NgModule({
  declarations: [
    ConfirmacionDialogComponent,
    FileUploadComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ConfirmacionDialogComponent,
    FileUploadComponent,
  ]
})
export class SharedModule { }
