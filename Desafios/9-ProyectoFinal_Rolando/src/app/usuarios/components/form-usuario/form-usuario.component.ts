import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/usuarios/interfaces/usuario';


export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidCtrl = !!(
      control &&
      control?.invalid &&
      control?.parent?.dirty
    );
    const invalidParent = !!(
      control &&
      control?.parent &&
      control?.parent?.invalid &&
      control?.parent?.dirty
    );
    return invalidCtrl || invalidParent;
  }
}


@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css'],
})
export class FormUsuarioComponent implements OnInit {

  titulo: string = 'Alta de usuario';
  matcher = new MyErrorStateMatcher();

  @Output() addUsuario: EventEmitter<Usuario> = new EventEmitter<Usuario>();

  fgUsuario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: Usuario
  ) {}

  ngOnInit(): void {
    this.configurarFormulario();
    if (this.editData) this.configurarEdicion(this.editData);
  }

  configurarFormulario() {
    this.fgUsuario = this.formBuilder.group({
      id: [''],
      email: ['', [
          Validators.required,
          Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
        ],
      ],
        password: ['',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{7,}$'
            ),
          ],
        ],
        pass2: ['', []],
        nombre: ['', [Validators.required]],
        direccion: ['', []],
        telefono: ['', []],
        admin: [false, []],
      },
      { validator: this.checkPasswords }
    );
  }

  configurarEdicion(usuario: Usuario) {
    this.titulo = 'Modificación de usuario';
    this.fgUsuario.controls['id'].setValue(usuario.id);
    this.fgUsuario.controls['email'].setValue(usuario.email);
    this.fgUsuario.controls['password'].setValue(usuario.password);
    this.fgUsuario.controls['pass2'].setValue(usuario.password);
    this.fgUsuario.controls['nombre'].setValue(usuario.nombre);
    this.fgUsuario.controls['direccion'].setValue(usuario.direccion);
    this.fgUsuario.controls['telefono'].setValue(usuario.telefono);
    this.fgUsuario.controls['admin'].setValue(usuario.admin);
  }


  errorHandling = (control: string, error: string) => {
    if (this.fgUsuario.controls[control].touched) {
      return this.fgUsuario.controls[control].hasError(error);
    } else {
      return false;
    }
  };

  checkPasswords(group: FormGroup) {
    let password = group.controls['password'].value;
    let confirmPass = group.controls['pass2'].value;
    return password === confirmPass ? null : { notSame: true };
  }

  aceptar() {
    if (this.fgUsuario.invalid) {
      alert('Datos inválidos.');
    }

    this.dialogRef.close(this.fgUsuario.value);
  }


}
