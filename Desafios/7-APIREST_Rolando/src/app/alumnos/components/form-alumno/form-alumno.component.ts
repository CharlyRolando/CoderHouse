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
  botonFoto:string = 'Foto';

  fgAlumno!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormAlumnoComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {

    this.configurarFormulario();

    if ('apellido' in this.editData ) this.configurarEdicionAlumno(this.editData);

  }


  configurarFormulario() {
    this.fgAlumno = this.formBuilder.group({
      id: [],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      sexo: [],
      edad: [, [Validators.min(17), Validators.max(100)]],
      perfil: [''],
      foto:['']
    });
  }

  errorHandling = (control: string, error: string) => {
    if (this.fgAlumno.controls[control].touched) {
      return this.fgAlumno.controls[control].hasError(error);
    } else {
      return false;
    }
  };

  configurarEdicionAlumno(alumno: Alumno) {
    this.titulo = 'Modificación de alumno';
    this.fgAlumno.setValue(alumno);
  }


  aceptar() {
    if (this.fgAlumno.invalid) {
      alert('Datos inválidos.');
    }

    this.dialogRef.close(this.fgAlumno.value);
  }



  addUrlFile(urlFile: string){
    this.fgAlumno.controls['foto'].setValue(urlFile);
  }



}
