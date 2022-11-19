import { Alumno } from "src/app/alumnos/interfaces/alumno";
import { Curso } from "src/app/cursos/interfaces/curso";
import { Usuario } from "src/app/usuarios/interfaces/usuario";

export interface InscripcionEntidad {
  id: string,
  alumno: Alumno,
  curso: Curso,
  usuario: Usuario,
  fecha: Date,
}
