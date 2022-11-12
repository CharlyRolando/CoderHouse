import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ConfirmacionDialogComponent } from './components/confirmacion-dialog/confirmacion-dialog.component';
import { NotificacionDialogComponent } from './components/notificacion-dialog/notificacion-dialog.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PipesModule } from './pipes/pipes.module';
import { DirectivesModule } from './directives/directives.module';


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
    MaterialModule,
    MatDialogModule,
    PipesModule,
    DirectivesModule
  ],
  entryComponents: [
    NotificacionDialogComponent,
    ConfirmacionDialogComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FileUploadComponent,
    PipesModule,
    DirectivesModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} }
  ],
})
export class SharedModule { }
