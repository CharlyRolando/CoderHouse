import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
} from '@angular/forms';
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
    if (this.editData) this.configurarEdicion();
  }

  configurarFormulario() {
    this.fgUsuario = this.formBuilder.group({
        user: ['', [Validators.required]],
        pass: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}$'
            ),
          ],
        ],
        pass2: ['', []],
        nombre: ['', [Validators.required]],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
          ],
        ],
        admin: [false, []],
      },
      { validator: this.checkPasswords }
    );
  }

  configurarEdicion() {
    this.titulo = 'Modificaci??n de usuario';
    this.fgUsuario.controls['user'].setValue(this.editData.user);
    this.fgUsuario.controls['nombre'].setValue(this.editData.nombre);
    this.fgUsuario.controls['email'].setValue(this.editData.email);
    this.fgUsuario.controls['admin'].setValue(this.editData.admin);
  }


  errorHandling = (control: string, error: string) => {
    if (this.fgUsuario.controls[control].touched) {
      return this.fgUsuario.controls[control].hasError(error);
    } else {
      return false;
    }
  };

  checkPasswords(group: FormGroup) {
    let pass = group.controls['pass'].value;
    let confirmPass = group.controls['pass2'].value;
    return pass === confirmPass ? null : { notSame: true };
  }

  aceptar() {
    if (this.fgUsuario.invalid) {
      alert('Datos inv??lidos.');
    }

    this.dialogRef.close(this.fgUsuario.value);
  }
}
