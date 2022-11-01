import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmacionDialogComponent } from '../confirmacion-dialog/confirmacion-dialog.component';


export class NotificacionDialogModel {
  constructor(public title: string, public message: string) {
  }
}


@Component({
  selector: 'app-notificacion-dialog',
  templateUrl: './notificacion-dialog.component.html',
  styleUrls: ['./notificacion-dialog.component.css']
})
export class NotificacionDialogComponent implements OnInit {

  title!: string;
  message!: string;

  constructor(public dialogRef: MatDialogRef<ConfirmacionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NotificacionDialogModel) {
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close(true);
  }

}
