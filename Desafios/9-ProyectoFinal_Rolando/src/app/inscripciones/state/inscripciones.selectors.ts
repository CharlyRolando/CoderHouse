import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Inscripcion } from '../interfaces/inscripcion';
import * as fromInscripciones from './inscripciones.reducer';


export const selectInscripcionesState = createFeatureSelector<fromInscripciones.InscripcionesState>(
  fromInscripciones.inscripcionesFeatureKey
);




export const selectInscripcionesLoading = createSelector(
  selectInscripcionesState,
  (state: fromInscripciones.InscripcionesState) => state.loading
);


export const selectInscripciones = createSelector(
  selectInscripcionesState,
  (state: fromInscripciones.InscripcionesState) => state.inscripciones
);




export const selectInscripcion = (inscripcionId: string) => createSelector(
  selectInscripciones,
  (inscripciones: Inscripcion[]) => {
    return inscripciones.filter(u => u.id == inscripcionId)[0]
  }
);




// export const selectInscripcionesEntity = createSelector(
//   selectInscripciones,
//   selectAlumnos,
//   selectCursos,
//   selectUsuarios,
//   (inscripciones: Inscripcion[], alumnos: Alumno[], cursos: Curso[], usuarios:Usuario[]) => {

//     return inscripciones.map((inscripcion: Inscripcion) => ({
//         ...inscripcion,
//         alumno: alumnos.filter(a => a.id == inscripcion.alumnoId)[0],
//         curso: cursos.filter(a => a.id == inscripcion.cursoId)[0],
//         usuario: usuarios.filter(a => a.id == inscripcion.usuarioId)[0],
//       }));

//   });

