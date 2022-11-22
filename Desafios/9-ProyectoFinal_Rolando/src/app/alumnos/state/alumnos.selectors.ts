import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Alumno } from '../interfaces/alumno';
import * as fromAlumnos from './alumnos.reducer';


export const selectAlumnosState = createFeatureSelector<fromAlumnos.AlumnosState>(
  fromAlumnos.alumnosFeatureKey
);


export const selectAlumnosLoading = createSelector(
  selectAlumnosState,
  (state: fromAlumnos.AlumnosState) => state.loading
);


export const selectAlumnos = createSelector(
  selectAlumnosState,
  (state: fromAlumnos.AlumnosState) => state.alumnos
);


export const selectAlumno = (alumnoId:string) => createSelector(
  selectAlumnos,
  (alumnos: Alumno[]) => {
    return alumnos.filter(a => a.id == alumnoId)[0]
  }
);


