export interface Alumno {
  id:number;
  nombre:string;
  sexo: eSexo;
  edad:number;
  fechaInicio:Date;
  cursos:Array<string>;
}


export enum eSexo{
  Masculino = 1,
  Femenino = 2
}


