import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { loadAlumnos } from 'src/app/alumnos/state/alumnos.actions';
import { AlumnosState } from 'src/app/alumnos/state/alumnos.reducer';
import { selectAlumnos } from 'src/app/alumnos/state/alumnos.selectors';
import { SesionService } from 'src/app/autenticacion/services/sesion.service';
import { Curso } from 'src/app/cursos/interfaces/curso';
import { InscripcionEntidad } from '../../interfaces/inscripcion-entidad';
import { loadInscripcionesEntidad } from '../../state/inscripciones-entidad.actions';
import { InscripcionesEntidadState } from '../../state/inscripciones-entidad.reducer';
import { selectInscripcionEntidadXcurso } from '../../state/inscripciones-entidad.selectors';


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
  suscripcionInscripcion!: Subscription;
  suscripcionAlumnos!: Subscription;
  curso!: Curso;


  constructor(
    private sesionService: SesionService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormInscripcionComponent>,
    private storeAlumnos: Store<AlumnosState>,
    private storeInscripcionesEntidad: Store<InscripcionesEntidadState>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {
    this.curso = editData;
  }



  ngOnInit(): void {

    this.getAlumnosData();

    this.configurarFormulario();

  }



  /* Solo debe mostrar los alumnos que no están inscriptos todavía */
  getAlumnosData() {

    this.storeAlumnos.dispatch(loadAlumnos());
    this.storeInscripcionesEntidad.dispatch(loadInscripcionesEntidad());

    this.suscripcionInscripcion = this.storeInscripcionesEntidad.select(selectInscripcionEntidadXcurso(this.curso.id)).subscribe({
      next: (inscrCurso: InscripcionEntidad[]) => {
        const alumnosId: string[] = inscrCurso.map((i) => i.alumnoId);

        this.suscripcionAlumnos = this.storeAlumnos.select(selectAlumnos).subscribe({
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


  configurarFormulario() {

    this.titulo = `Inscripción al curso de '${this.curso.nombre}'`;

    this.fgInscripcion = this.formBuilder.group({
      id: '',
      alumnoId: '',
      cursoId: this.curso.id,
      usuarioId: this.sesionService.sesion.usuarioActivo?.id,
      fecha: new Date()
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
    this.suscripcionInscripcion.unsubscribe();
    this.suscripcionAlumnos.unsubscribe();
  }



}
