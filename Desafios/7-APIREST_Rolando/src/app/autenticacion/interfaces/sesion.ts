import { Usuario } from "src/app/usuarios/interfaces/usuario";

export interface Sesion {
  sesionActiva: boolean;
  usuarioActivo?: Usuario;
}
