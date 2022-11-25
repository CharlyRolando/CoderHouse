import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaAlumnosComponent } from './lista-alumnos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { alumnoReducer, alumnosFeatureKey } from '../../state/alumnos.reducer';
import { AlumnosEffects } from '../../state/alumnos.effects';
import { ActivatedRoute } from '@angular/router';


describe('ListaAlumnosComponent', () => {
  let component: ListaAlumnosComponent;
  let fixture: ComponentFixture<ListaAlumnosComponent>;

  let store: MockStore;
  const initialState = {
    loading: Boolean,};

  const testStore = jasmine.createSpyObj('Store', ['dispatch', 'select']);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ListaAlumnosComponent
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
        {provide: ActivatedRoute, useValue: []},
        {provide: Store, useValue: testStore },
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();

    store = TestBed.get(Store);
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch').and.callFake(() => {});

    fixture = TestBed.createComponent(ListaAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {

    testStore.select.and.returnValue(alumnosFeatureKey);
    testStore.dispatch.and.returnValue(jasmine.createSpy());

    expect(component).toBeTruthy();
  });
});
