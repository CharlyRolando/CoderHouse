import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alumno } from 'src/app/alumnos/interfaces/alumno';


@Component({
  selector: 'app-form-alumno',
  templateUrl: './form-alumno.component.html',
  styleUrls: ['./form-alumno.component.css'],
})
export class FormAlumnoComponent implements OnInit {

  titulo: string = 'Alta de alumno';
  botonFoto: string = 'Foto';

  fgAlumno!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FormAlumnoComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) { }

  ngOnInit(): void {
    this.configurarFormulario();
    if (this.editData) this.configurarEdicionAlumno(this.editData);
  }


  configurarFormulario() {
    this.fgAlumno = this.formBuilder.group({
      id: [''],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      sexo: [0],
      edad: [0, [Validators.min(17), Validators.max(100)]],
      perfil: [''],
      foto: ['']
    });
  }

  configurarEdicionAlumno(alumno: Alumno) {
    this.titulo = 'Modificación de alumno';
    this.fgAlumno.controls['id'].setValue(alumno.id);
    this.fgAlumno.controls['nombre'].setValue(alumno.nombre);
    this.fgAlumno.controls['apellido'].setValue(alumno.apellido);
    this.fgAlumno.controls['sexo'].setValue(alumno.sexo);
    this.fgAlumno.controls['edad'].setValue(alumno.edad);
    this.fgAlumno.controls['perfil'].setValue(alumno.perfil);
    this.fgAlumno.controls['foto'].setValue(alumno.foto);
  }


  errorHandling = (control: string, error: string) => {
    if (this.fgAlumno.controls[control].touched) {
      return this.fgAlumno.controls[control].hasError(error);
    } else {
      return false;
    }
  };


  aceptar() {
    if (this.fgAlumno.invalid) {
      alert('Datos inválidos.');
    }
    this.dialogRef.close(this.fgAlumno.value);
  }



  addUrlFile(urlFile: string) {
    this.fgAlumno.controls['foto'].setValue(urlFile);
  }



}
