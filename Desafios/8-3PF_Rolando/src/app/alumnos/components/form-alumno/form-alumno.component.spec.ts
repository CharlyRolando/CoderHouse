import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormAlumnoComponent } from './form-alumno.component';


describe('FormAlumnoComponent', () => {
  let component: FormAlumnoComponent;
  let fixture: ComponentFixture<FormAlumnoComponent>;

  const dialogMock = {
    close: () => { }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormAlumnoComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: MatDialog, useValue: [] },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  /* MIS TEST ****************************************************/
  it('check required fields', () => {
    component.fgAlumno.controls['nombre'].setValue('Pepe');
    component.fgAlumno.controls['apellido'].setValue('Prueba');
    component.fgAlumno.controls['edad'].setValue(17);
    expect(component.fgAlumno.valid).toBeTrue();
  });


  it('check nombre required', () => {
    component.fgAlumno.controls['apellido'].setValue('Prueba');
    component.fgAlumno.controls['edad'].setValue(17);
    expect(component.fgAlumno.valid).toBeFalse();
  });


  it('check edad minor 17', () => {
    component.fgAlumno.controls['nombre'].setValue('Pepe');
    component.fgAlumno.controls['apellido'].setValue('Prueba');
    component.fgAlumno.controls['edad'].setValue(16);
    expect(component.fgAlumno.valid).toBeFalse();
  });


  it('check edad between 17 and 100', () => {
    component.fgAlumno.controls['nombre'].setValue('Pepe');
    component.fgAlumno.controls['apellido'].setValue('Prueba');
    component.fgAlumno.controls['edad'].setValue(17);
    expect(component.fgAlumno.valid).toBeTrue();
  });


  it('check aceptar() valid form', () => {
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.fgAlumno.controls['nombre'].setValue('Pepe');
    component.fgAlumno.controls['apellido'].setValue('Prueba');
    component.fgAlumno.controls['edad'].setValue(17);
    component.aceptar();
    expect(spy).toHaveBeenCalled();
  });


  it('check aceptar() invalid form', () => {
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.fgAlumno.controls['edad'].setValue(117);
    component.aceptar();
    expect(spy).toHaveBeenCalled();
  });


  it('check addUrlFile() ', () => {
    component.addUrlFile('fotoPrueba');
    expect(component.fgAlumno.controls['foto'].value == 'fotoPrueba').toBeTrue();
  });


  it('check errorHandling on touched', () => {
    component.fgAlumno.markAllAsTouched();
    expect(component.errorHandling('nombre', 'errorPrueba')).toBeFalse();
  });
  /*****************************************************************************/



});
