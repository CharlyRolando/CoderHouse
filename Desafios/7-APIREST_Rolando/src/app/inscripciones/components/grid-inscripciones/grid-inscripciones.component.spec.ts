import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridInscripcionesComponent } from './grid-inscripciones.component';

describe('GridInscripcionesComponent', () => {
  let component: GridInscripcionesComponent;
  let fixture: ComponentFixture<GridInscripcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridInscripcionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridInscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
