import { Alumno } from "src/app/alumnos/interfaces/alumno";
import { Curso } from "src/app/cursos/interfaces/curso";
import { Usuario } from "src/app/usuarios/interfaces/usuario";

export interface Inscripcion {
  id: string,
  alumnoId: string,
  cursoId: string,
  usuarioId: string,
  fecha: Date,
}
