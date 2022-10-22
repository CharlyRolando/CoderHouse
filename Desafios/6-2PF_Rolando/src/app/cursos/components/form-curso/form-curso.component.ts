import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Curso } from 'src/app/models/curso';

@Component({
  selector: 'app-form-curso',
  templateUrl: './form-curso.component.html',
  styleUrls: ['./form-curso.component.css']
})
export class FormCursoComponent implements OnInit {

  titulo: string = 'Alta de curso';

  botonFoto:string = 'Foto';
  botonLogo:string = 'Logo';
  valorFoto:string = '';
  valorLogo:string = '';


  fgCurso!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<FormCursoComponent>,
    @Inject(MAT_DIALOG_DATA) public cursoEdit: Curso
  ) {}

  ngOnInit(): void {
    this.configurarFormulario();
    if (this.cursoEdit) this.configurarEdicion();
  }


  configurarFormulario() {
    this.fgCurso = new FormGroup({
      id: new FormControl(),
      nombre: new FormControl(),
      logo: new FormControl(),
      comision: new FormControl(),
      profesor: new FormControl(),
      foto: new FormControl(),
      fechaInicio: new FormControl(),
      fechaFin: new FormControl(),
      inscripcionAbierta: new FormControl()
    });
  }

  configurarEdicion() {
    this.titulo = 'Modificación de alumno';
    this.fgCurso.setValue(this.cursoEdit);
  }

  aceptar() {
    if (this.fgCurso.invalid) {
      alert('Datos inválidos.');
    }
    this.dialogRef.close(this.fgCurso.value);
  }
}
