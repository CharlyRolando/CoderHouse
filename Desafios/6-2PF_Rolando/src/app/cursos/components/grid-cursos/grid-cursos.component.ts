import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { Curso } from 'src/app/cursos/interfaces/curso';
import { CursosService } from 'src/app/cursos/services/cursos.service';
import { ListaAlumnosComponent } from 'src/app/alumnos/components/lista-alumnos/lista-alumnos.component';
import {
  ConfirmacionDialogComponent,
  ConfirmacionDialogModel,
} from 'src/app/_shared/components/confirmacion-dialog/confirmacion-dialog.component';
import { FormCursoComponent } from '../form-curso/form-curso.component';
import { FormAlumnoComponent } from 'src/app/alumnos/components/form-alumno/form-alumno.component';
import { AlumnosService } from 'src/app/alumnos/services/alumnos.service';
import { Alumno } from 'src/app/alumnos/interfaces/alumno';

@Component({
  selector: 'app-grid-cursos',
  templateUrl: './grid-cursos.component.html',
  styleUrls: ['./grid-cursos.component.css'],
})
export class GridCursosComponent implements OnInit, OnDestroy {
  cursos$!: Observable<Curso[]>;

  constructor(
    private cursosService: CursosService,
    private alumnosService: AlumnosService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cursos$ = this.cursosService.getCursos();
  }

  addCurso(): void {
    const dialogAlta = this.dialog.open(FormCursoComponent, {
      width: '90%',
    });

    dialogAlta.afterClosed().subscribe((respCurso: Curso) => {
      if (respCurso) {
        this.cursosService.addCurso(respCurso);

        this._snackBar.open(
          `El curso '${respCurso.nombre}' fue agregado exitosamente.`,
          '',
          { duration: 2000 }
        );
      }
    });
  }

  editCurso(curso: Curso): void {
    const dialogEdit = this.dialog.open(FormCursoComponent, {
      width: '50%',
      data: curso,
    });

    dialogEdit.afterClosed().subscribe((respCurso: Curso) => {
      if (respCurso) {
        this.cursosService.editCurso(respCurso);

        this._snackBar.open(
          `El curso '${curso.nombre}' fue modificado exitosamente.`,
          '',
          { duration: 2000 }
        );
      }
    });
  }

  deleteConfirmacion(curso: Curso): void {
    const message = `Confirma la eliminación de '${curso.nombre}'?`;
    const dialogData = new ConfirmacionDialogModel('Eliminar curso', message);

    const dialogRef = this.dialog.open(ConfirmacionDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.deleteCurso(curso);
      }
    });
  }

  deleteCurso(curso: Curso): void {
    this.cursosService.deleteCurso(curso.id);

    this._snackBar.open(
      `El curso '${curso.nombre}' fue eliminado exitosamente.`,
      '',
      { duration: 2000 }
    );
  }

  /* Inscripción de alumnos *************************************/
  inscripcion(curso: Curso) {
    const dialogEdit = this.dialog.open(FormAlumnoComponent, {
      width: '50%',
      data: curso,
    });

    dialogEdit.afterClosed().subscribe((respAlumno: Alumno) => {
      if (respAlumno) {
        this.alumnosService.addAlumno(respAlumno);

        this._snackBar.open(
          `Se inscribió a '${respAlumno.nombre} ${respAlumno.apellido}' al curso de '${curso.nombre}'.`,
          '',
          { duration: 2000 }
        );
      }
    });
  }

  verAlumnos(curso: Curso) {
    const dialogAlta = this.dialog.open(ListaAlumnosComponent, {
      width: '500px',
      data: curso,
    });
  }
  /**********************************************************************************/

  ngOnDestroy() {}
}
