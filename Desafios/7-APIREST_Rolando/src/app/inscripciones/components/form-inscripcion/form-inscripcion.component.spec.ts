import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInscripcionComponent } from './form-inscripcion.component';

describe('FormInscripcionComponent', () => {
  let component: FormInscripcionComponent;
  let fixture: ComponentFixture<FormInscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInscripcionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
