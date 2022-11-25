import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridCursosComponent } from './grid-cursos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { cursoReducer, cursosFeatureKey, CursosState } from '../../state/cursos.reducer';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { CursosEffects } from '../../state/cursos.effects';


describe('GridCursosComponent', () => {
  let component: GridCursosComponent;
  let fixture: ComponentFixture<GridCursosComponent>;

  let store: Store<CursosState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GridCursosComponent
      ],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,

        RouterTestingModule,
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([]),

        StoreModule.forFeature(cursosFeatureKey, cursoReducer),
        EffectsModule.forFeature([CursosEffects]),
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: []},
        {provide: MatDialog, useValue: []},
        {provide: ActivatedRoute, useValue: []},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(Store);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
