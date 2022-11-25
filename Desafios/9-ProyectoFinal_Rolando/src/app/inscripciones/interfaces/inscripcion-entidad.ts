import { Alumno } from "src/app/alumnos/interfaces/alumno";
import { Curso } from "src/app/cursos/interfaces/curso";
import { Usuario } from "src/app/usuarios/interfaces/usuario";

export interface InscripcionEntidad {
  id: string,
  alumnoId: string,
  cursoId: string,
  usuarioInscriptor: string,
  fecha: Date,
  alumno: Alumno,
  curso: Curso,
}
