import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridAlumnosComponent } from './grid-alumnos.component';

describe('GridAlumnosComponent', () => {
  let component: GridAlumnosComponent;
  let fixture: ComponentFixture<GridAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridAlumnosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
