import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridAlumnosComponent } from './grid-alumnos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { alumnoReducer, alumnosFeatureKey, AlumnosState } from '../../state/alumnos.reducer';
import { AlumnosEffects } from '../../state/alumnos.effects';


describe('GridAlumnosComponent', () => {
  let component: GridAlumnosComponent;
  let fixture: ComponentFixture<GridAlumnosComponent>;

  let store: Store<AlumnosState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
         GridAlumnosComponent
      ],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,

        RouterTestingModule,
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([]),

        StoreModule.forFeature(alumnosFeatureKey, alumnoReducer),
        EffectsModule.forFeature([AlumnosEffects]),
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: []},
        {provide: MatDialog, useValue: []},
        {provide: MatSort, useValue: []},
        {provide: ActivatedRoute, useValue: []},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(Store);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
