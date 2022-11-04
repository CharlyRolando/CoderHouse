import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Curso } from 'src/app/cursos/interfaces/curso';


@Component({
  selector: 'app-form-curso',
  templateUrl: './form-curso.component.html',
  styleUrls: ['./form-curso.component.css']
})
export class FormCursoComponent implements OnInit {

  titulo: string = 'Alta de curso';

  botonFoto: string = 'Foto';
  botonLogo: string = 'Logo';
  valorFoto: string = '';
  valorLogo: string = '';

  fgCurso!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormCursoComponent>,
    @Inject(MAT_DIALOG_DATA) public cursoEdit: Curso
  ) { }

  ngOnInit(): void {
    if (this.cursoEdit) {
      this.configurarEdicion(this.cursoEdit);
    } else {
      this.configurarFormulario();
    }
  }


  configurarFormulario() {
    this.fgCurso = this.formBuilder.group({
      id: [''],
      nombre: ['', [Validators.required]],
      logo: [''],
      comision: [, [Validators.required]],
      profesor: ['', [Validators.required]],
      foto: [''],
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],
      inscripcion: [false]
    });
  }

  configurarEdicion(curso: Curso) {
    this.titulo = 'Modificación del curso';
    this.fgCurso = this.formBuilder.group(curso);
  }


  errorHandling = (control: string, error: string) => {
    if (this.fgCurso.controls[control].touched) {
      return this.fgCurso.controls[control].hasError(error);
    } else {
      return false;
    }
  };


  aceptar() {
    if (this.fgCurso.invalid) {
      alert('Datos inválidos.');
    }
    this.dialogRef.close(this.fgCurso.value);
  }


  addUrlFileLogo(urlFile: string) {
    this.fgCurso.controls['logo'].setValue(urlFile);
  }

  addUrlFileFoto(urlFile: string) {
    this.fgCurso.controls['foto'].setValue(urlFile);
  }


}
