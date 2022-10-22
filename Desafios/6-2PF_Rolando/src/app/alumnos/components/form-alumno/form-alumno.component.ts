import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { listaCursos } from 'src/assets/data/cursos';
import { Alumno } from 'src/app/alumnos/interfaces/alumno';
import { Curso } from 'src/app/cursos/interfaces/curso';

@Component({
  selector: 'app-form-alumno',
  templateUrl: './form-alumno.component.html',
  styleUrls: ['./form-alumno.component.css'],
})
export class FormAlumnoComponent implements OnInit {
  titulo: string = 'Alta de alumno';

  cursos: Curso[] = listaCursos;

  fgAlumno!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormAlumnoComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: Alumno
  ) {}

  ngOnInit(): void {
    this.configurarFormulario();
    if (this.editData) this.configurarEdicion();
  }


  configurarFormulario() {
    this.fgAlumno = this.formBuilder.group({
      id: [],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      sexo: [],
      edad: [''],
      fechaInicio: ['', [Validators.required]],
      cursoId: [, [Validators.required]],
    });
  }

  configurarEdicion() {
    this.titulo = 'Modificación de alumno';
    this.fgAlumno.setValue(this.editData);
  }

  aceptar() {
    if (this.fgAlumno.invalid) {
      alert('Datos inválidos.');
    }

    this.dialogRef.close(this.fgAlumno.value);
  }
}
