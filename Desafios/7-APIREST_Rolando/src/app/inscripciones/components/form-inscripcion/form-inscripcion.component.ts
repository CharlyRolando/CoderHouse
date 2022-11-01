import { formatDate } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, Subscription } from 'rxjs';
import { Alumno } from 'src/app/alumnos/interfaces/alumno';
import { AlumnosService } from 'src/app/alumnos/services/alumnos.service';
import { SesionService } from 'src/app/autenticacion/services/sesion.service';
import { Curso } from 'src/app/cursos/interfaces/curso';
import { Inscripcion } from '../../interfaces/inscripcion';
import { InscripcionesService } from '../../services/inscripciones.service';

@Component({
  selector: 'app-form-inscripcion',
  templateUrl: './form-inscripcion.component.html',
  styleUrls: ['./form-inscripcion.component.css']
})
export class FormInscripcionComponent implements OnInit, OnDestroy {

  titulo: string = 'Inscripción';
  fgInscripcion!: FormGroup;
  alumnos: any[] = [];
  alumnosSeleccion = this.alumnos;
  suscripcion!: Subscription;
  curso!: Curso;


  constructor(
    private sesionService: SesionService,
    private inscripcionesService: InscripcionesService,
    private alumnosService: AlumnosService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormInscripcionComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {
    this.curso = editData;
  }



  getAlumnosData() {

    this.suscripcion = this.inscripcionesService.getInscripcionesXcurso(this.curso.id).subscribe({
      next: (inscrCurso: Inscripcion[]) => {
        const alumnosId: string[] = inscrCurso.map((i) => i.alumnoId);

        this.alumnosService.getAlumnos().subscribe({
          next: (alumnos) => {

            alumnos = alumnos.filter((a) => !alumnosId.includes(a.id));
            this.alumnos = alumnos.map(person => ({
              ...person,
              fullName: `${person.nombre} ${person.apellido}`
            }));

            this.alumnosSeleccion = this.alumnos;

          }
        });

      }
    });

  }



  ngOnInit(): void {

    this.getAlumnosData();
    this.configurarFormulario(this.curso);

  }


  configurarFormulario(curso: Curso) {

    this.titulo = `Inscripción al curso de ${curso.nombre}`;

    this.fgInscripcion = this.formBuilder.group({
      id: '',
      alumnoId: '',
      cursoId: curso.id,
      usuarioId: this.sesionService.sesion.usuarioActivo?.id,
      fecha: new Date() //formatDate(new Date(), 'yyyy/MM/dd', 'en')
    });
  }


  errorHandling = (control: string, error: string) => {
    if (this.fgInscripcion.controls[control].touched) {
      return this.fgInscripcion.controls[control].hasError(error);
    } else {
      return false;
    }
  };



  aceptar() {
    if (this.fgInscripcion.invalid) {
      alert('Datos inválidos.');
    }
    this.dialogRef.close(this.fgInscripcion.value);
  }



  onKey(e: any) {
    this.alumnosSeleccion = this.search(e.target.value);
  }

  search(value: string) {
    let filter = value.toLowerCase();
    return this.alumnos.filter(option =>
      option.fullName.toLowerCase().startsWith(filter)
    );
  }



  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }



}
