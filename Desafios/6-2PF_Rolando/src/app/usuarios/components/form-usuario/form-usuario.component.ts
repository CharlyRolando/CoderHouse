import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, FormGroupDirective, NgForm, ValidationErrors } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Usuario } from 'src/app/models/usuario';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control && control?.parent && control?.parent?.invalid && control?.parent?.dirty);
    return (invalidCtrl || invalidParent);
  }
}


@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {

  matcher = new MyErrorStateMatcher();

  @Output() addUsuario: EventEmitter<Usuario> = new EventEmitter<Usuario>();

  fgUsuario = this.fb.group({
    user: ['',[Validators.required]],
    pass: ['',[Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")]],
    pass2: ['',[]],
    nombre: ['',[Validators.required]],
    email: ['',[Validators.required, Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")]],
    admin: [false,[]]
  }, { validator: this.checkPasswords });


  constructor(
                private fb: FormBuilder
              ) { }

  ngOnInit(): void {
  }

  errorHandling = (control: string, error: string) => {
    if (this.fgUsuario.controls[control].touched){
      return this.fgUsuario.controls[control].hasError(error);
    }else{
      return false;
    }
  }
  checkPasswords(group: FormGroup) {
    let pass = group.controls['pass'].value;
    let confirmPass = group.controls['pass2'].value;
    return pass === confirmPass ? null : { notSame: true }
  }


  onSubmit() {
    this.addUsuario.emit(this.fgUsuario.value);
    this.fgUsuario.reset();
  }


  cancelar(){
    this.fgUsuario.reset();
  }

}










// fgUsuario!: FormGroup;
    // this.fgUsuario = this.fb.group({
    //   user: new FormControl('',[Validators.required]),
    //   pass: new FormControl('',[Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")]),
    //   pass2: new FormControl('',[Validators.required]),
    //   nombre: new FormControl('',[Validators.required]),
    //   email: new FormControl('',[Validators.required, Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")]),
    //   admin: new FormControl(false,[])
    // });


