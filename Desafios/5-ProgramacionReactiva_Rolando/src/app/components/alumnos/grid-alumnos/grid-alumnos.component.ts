import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { listaAlumnos } from 'src/app/data/alumnos';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormAlumnoComponent } from '../form-alumno/form-alumno.component';
import {
  ConfirmacionDialogComponent,
  ConfirmacionDialogModel,
} from '../../confirmacion-dialog/confirmacion-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { listaCursos } from 'src/app/data/cursos';
import { Curso } from 'src/app/models/curso';

@Component({
  selector: 'app-grid-alumnos',
  templateUrl: './grid-alumnos.component.html',
  styleUrls: ['./grid-alumnos.component.css'],
})
export class GridAlumnosComponent implements OnInit {
  alumnos: Alumno[] = listaAlumnos;
  cursos: Curso[] = listaCursos;

  dataSource: MatTableDataSource<Alumno> = new MatTableDataSource<Alumno>(
    this.alumnos
  );
  columnas: string[] = [
    'id',
    'nombreCompleto',
    'sexo',
    'edad',
    'fechaInicio',
    'curso',
    'acciones',
  ];

  constructor(public dialog: MatDialog,
              private _snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  addAlumno(): void {
    const dialogAlta = this.dialog.open(FormAlumnoComponent, {
      width: '50%',
    });

    dialogAlta.afterClosed().subscribe((res) => {
      if (res) {
        this.alumnos.push({
          ...res,
          id: this.alumnos.length + 1,
        });

        this.dataSource.data = this.alumnos;

        this._snackBar.open(
          `El alumno '${res.nombre}' fue agregado exitosamente.`,
          '',
          { duration: 1500 }
        );
      }
    });
  }

  editAlumno(alumno: Alumno): void {
    const dialogEdit = this.dialog.open(FormAlumnoComponent, {
      width: '50%',
      data: alumno,
    });

    dialogEdit.afterClosed().subscribe((res) => {
      if (res) {
        let indice = this.alumnos.findIndex((a) => a.id == res.id);

        this.alumnos.splice(indice, 1, res);

        this.dataSource.data = this.alumnos;

        this._snackBar.open(
          `El alumno '${alumno.nombre}' fue modificado exitosamente.`,
          '',
          { duration: 1500 }
        );
      }
    });
  }

  deleteConfirmacion(alumno: Alumno): void {
    const message = `Confirma la eliminación de '${alumno.nombre}'?`;
    const dialogData = new ConfirmacionDialogModel('Eliminar alumno', message);

    const dialogRef = this.dialog.open(ConfirmacionDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.deleteAlumno(alumno);
      }
    });
  }

  deleteAlumno(alumno: Alumno): void {
    let indice = this.alumnos.findIndex((a) => a.id == alumno.id);
    this.alumnos.splice(indice, 1);
    this.dataSource.data = this.alumnos;

    this._snackBar.open(
      `El alumno '${alumno.nombre}' fue eliminado exitosamente.`,
      '',
      { duration: 1500 }
    );
  }

  filtrarXNombreCompleto(event: Event) {
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = function (
      alumno: Alumno,
      filtro: string
    ) {
      return (
        alumno.nombre.toLocaleLowerCase().includes(filtro.toLocaleLowerCase()) ||
        alumno.apellido.toLocaleLowerCase().includes(filtro.toLocaleLowerCase())
      );
    };
    this.dataSource.filter = valorObtenido.trim().toLowerCase();
  }

  filtrarXCurso(event: Event) {
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = function (
      alumno: Alumno,
      filtro: string
    ) {
      var filtrolower: string = filtro.toLocaleLowerCase();
      var resultado: boolean = false;
      listaCursos.forEach((element) => {
        if (
          element.nombre.toLocaleLowerCase().includes(filtrolower) &&
          element.id == alumno.cursoId
        )
          resultado = true;
      });
      return resultado;
    };
    this.dataSource.filter = valorObtenido.trim().toLowerCase();
  }
}
