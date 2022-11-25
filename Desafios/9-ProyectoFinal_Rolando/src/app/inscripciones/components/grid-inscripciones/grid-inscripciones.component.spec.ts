import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridInscripcionesComponent } from './grid-inscripciones.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { InscripcionesModule } from '../../inscripciones.module';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { inscripcionesFeatureKey, inscripcionReducer } from '../../state/inscripciones.reducer';
import { inscripcionEntidadReducer, inscripcionesEntidadFeatureKey } from '../../state/inscripciones-entidad.reducer';
import { InscripcionesEntidadEffects } from '../../state/inscripciones-entidad.effects';
import { AlumnosEffects } from 'src/app/alumnos/state/alumnos.effects';
import { InscripcionesEffects } from '../../state/inscripciones.effects';
import { alumnoReducer, alumnosFeatureKey } from 'src/app/alumnos/state/alumnos.reducer';
import { cursosFeatureKey } from 'src/app/cursos/state/cursos.reducer';

describe('GridInscripcionesComponent', () => {
  let component: GridInscripcionesComponent;
  let fixture: ComponentFixture<GridInscripcionesComponent>;

    let store: MockStore;
    const initialState = {
      loading: Boolean,
      inscripciones: []
    };

    const testStore = jasmine.createSpyObj('Store', ['dispatch', 'select']);

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          GridInscripcionesComponent
        ],
        imports: [
          HttpClientTestingModule,
          MatSnackBarModule,
          InscripcionesModule,
          RouterTestingModule,
          StoreModule.forRoot({}, {}),
          EffectsModule.forRoot([]),
          StoreModule.forFeature(inscripcionesFeatureKey, inscripcionReducer),
          StoreModule.forFeature(inscripcionesEntidadFeatureKey, inscripcionEntidadReducer),
          StoreModule.forFeature(alumnosFeatureKey, alumnoReducer),
          EffectsModule.forFeature([InscripcionesEffects, InscripcionesEntidadEffects, AlumnosEffects]),
        ],
        providers: [
          { provide: MatDialogRef, useValue: {} },
          { provide: MAT_DIALOG_DATA, useValue: [] },
          { provide: MatDialog, useValue: [] },
          { provide: ActivatedRoute, useValue: [] },
          { provide: Store, useValue: testStore },
          provideMockStore({ initialState }),
        ]
      })
        .compileComponents();

      store = TestBed.get(Store);
      store = TestBed.inject(MockStore);
      spyOn(store, 'dispatch').and.callFake(() => { });

      fixture = TestBed.createComponent(GridInscripcionesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {

      testStore.select.and.returnValue(cursosFeatureKey);
      testStore.select.and.returnValue(alumnosFeatureKey);
      testStore.select.and.returnValue(inscripcionesEntidadFeatureKey);

      testStore.dispatch.and.returnValue(jasmine.createSpy());

      expect(component).toBeTruthy();
    });
  });
