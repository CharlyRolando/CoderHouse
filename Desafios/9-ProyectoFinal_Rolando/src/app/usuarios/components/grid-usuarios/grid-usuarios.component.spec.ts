import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridUsuariosComponent } from './grid-usuarios.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { usuarioReducer, usuariosFeatureKey, UsuariosState } from '../../state/usuarios.reducer';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { UsuariosEffects } from '../../state/usuarios.effects';


describe('GridUsuariosComponent', () => {
  let component: GridUsuariosComponent;
  let fixture: ComponentFixture<GridUsuariosComponent>;

  let store: Store<UsuariosState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GridUsuariosComponent
      ],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,

        RouterTestingModule,
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([]),

        StoreModule.forFeature(usuariosFeatureKey, usuarioReducer),
        EffectsModule.forFeature([UsuariosEffects])
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: []},
        {provide: MatDialog, useValue: []},
        {provide: ActivatedRoute, useValue: []},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(Store);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
