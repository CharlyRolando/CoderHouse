import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ConfirmacionDialogComponent } from './components/confirmacion-dialog/confirmacion-dialog.component';
import { NotificacionDialogComponent } from './components/notificacion-dialog/notificacion-dialog.component';


@NgModule({
  declarations: [
    NotificacionDialogComponent,
    ConfirmacionDialogComponent,
    FileUploadComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  entryComponents: [
    NotificacionDialogComponent,
    ConfirmacionDialogComponent
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FileUploadComponent,
  ]
})
export class SharedModule { }
