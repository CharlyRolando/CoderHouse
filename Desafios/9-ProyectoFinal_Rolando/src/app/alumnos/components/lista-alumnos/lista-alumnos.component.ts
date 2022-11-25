import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alumno } from 'src/app/alumnos/interfaces/alumno';
import { Curso } from 'src/app/cursos/interfaces/curso';
import { Observable, Subscription } from 'rxjs';
import { InscripcionesEntidadState } from 'src/app/inscripciones/state/inscripciones-entidad.reducer';
import { Store } from '@ngrx/store';
import { loadInscripcionesEntidad } from 'src/app/inscripciones/state/inscripciones-entidad.actions';
import { selectInscripcionEntidadXcurso } from 'src/app/inscripciones/state/inscripciones-entidad.selectors';
import { InscripcionEntidad } from 'src/app/inscripciones/interfaces/inscripcion-entidad';
import { Router } from '@angular/router';



@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css'],
})
export class ListaAlumnosComponent implements OnInit, OnDestroy {

  titulo: string = `Alumnos del curso de '${this.cursoFiltro.nombre}'`;
  alumnos$!: Observable<Alumno[]>;
  alumnos: Alumno[] = [];
  suscripcion!: Subscription;

  constructor(
    private storeInscripcionesEntidad: Store<InscripcionesEntidadState>,
    private dialogRef: MatDialogRef<ListaAlumnosComponent>,
    @Inject(MAT_DIALOG_DATA) public cursoFiltro: Curso,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.getAlumonsXcurso(this.cursoFiltro.id);
  }


  getAlumonsXcurso(cursoId: string) {

    this.storeInscripcionesEntidad.dispatch(loadInscripcionesEntidad());
    this.suscripcion = this.storeInscripcionesEntidad.select(selectInscripcionEntidadXcurso(cursoId))
    .subscribe((inscripciones: InscripcionEntidad[]) => {
      this.alumnos = inscripciones?.map((inscripcion) => {
        return inscripcion.alumno;
      })
    });

  }


  irAlAlumno(alumnoId:string){
    this.router.navigate(['/container/alumnos/alumno', alumnoId, 'detalles']);
    this.dialogRef.close();
  }


  ngOnDestroy(): void {
   this.suscripcion.unsubscribe();
  }



}
