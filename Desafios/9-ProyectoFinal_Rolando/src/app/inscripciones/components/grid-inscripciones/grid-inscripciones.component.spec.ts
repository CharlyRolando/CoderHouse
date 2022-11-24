import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridInscripcionesComponent } from './grid-inscripciones.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';



describe('GridInscripcionesComponent', () => {
  let component: GridInscripcionesComponent;
  let fixture: ComponentFixture<GridInscripcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridInscripcionesComponent ],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: []},
        {provide: MatDialog, useValue: []},
        {provide: ActivatedRoute, useValue: []},
        {provide: Store, useValue: []},
      ]
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
