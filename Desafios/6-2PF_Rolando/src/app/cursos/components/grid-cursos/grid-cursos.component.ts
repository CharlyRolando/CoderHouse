import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { Curso } from 'src/app/models/curso';
import { CursosService } from 'src/app/cursos/services/cursos.service';
import { ListaAlumnosComponent } from 'src/app/alumnos/components/lista-alumnos/lista-alumnos.component';
import { ConfirmacionDialogComponent, ConfirmacionDialogModel} from 'src/app/shared/components/confirmacion-dialog/confirmacion-dialog.component';
import { FormCursoComponent } from '../form-curso/form-curso.component';

@Component({
  selector: 'app-grid-cursos',
  templateUrl: './grid-cursos.component.html',
  styleUrls: ['./grid-cursos.component.css'],
})
export class GridCursosComponent implements OnInit, OnDestroy {

  suscripcion!: Subscription;
  cursos!: Curso[];

  cursos$!: Observable<Curso[]>;

  constructor(
    private cursosService: CursosService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {

     /* Solo para cumplir con el requerimiento de la entrega ********************
      (porque estoy usando el 'pipe async' que me desubscribe automáticamente) */
    this.suscripcion = this.cursosService.getCursos().subscribe({
      next: (respCursos: Curso[]) => {
        this.cursos = respCursos;
      },
      error: (error) => {
        console.error(error);
      }
    });
    /****************************************************************************/

    this.cursos$ = this.cursosService.getCursos();
  }

  addCurso(): void {
    const dialogAlta = this.dialog.open(FormCursoComponent, {
      width: '90%',
    });

    dialogAlta.afterClosed().subscribe((respCurso) => {
      if (respCurso) {

        this.cursosService.addCurso(respCurso);

        this._snackBar.open(
          `El curso '${respCurso.nombre}' fue agregado exitosamente.`,
          '',
          { duration: 1500 }
        );
      }
    });
  }

  editCurso(curso: Curso): void {
    const dialogEdit = this.dialog.open(FormCursoComponent, {
      width: '50%',
      data: curso,
    });

    dialogEdit.afterClosed().subscribe((respCurso) => {
      if (respCurso) {

        this.cursosService.editCurso(respCurso);

        this._snackBar.open(
          `El curso '${curso.nombre}' fue modificado exitosamente.`,
          '',
          { duration: 1500 }
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
      { duration: 1500 }
    );
  }

  verAlumnos(curso: Curso) {
    const dialogAlta = this.dialog.open(ListaAlumnosComponent, {
      width: '500px',
      data: curso,
    });
  }

  inscripcion(curso: Curso) {
    this._snackBar.open(`Función pendiente de desarrollo.`, '', {
      duration: 2500,
    });
  }



  ngOnDestroy() {
    /* Solo para cumplir con el requerimiento de la entrega
      (porque estoy usando el 'pipe async' que me desubscribe automáticamente) */
    this.suscripcion.unsubscribe();
  }

}
