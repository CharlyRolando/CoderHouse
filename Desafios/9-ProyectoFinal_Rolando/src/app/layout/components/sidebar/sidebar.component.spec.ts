import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { ActivatedRoute } from '@angular/router';
import { Sesion } from 'src/app/autenticacion/interfaces/sesion';


describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  let store: Store<Sesion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SidebarComponent
      ],
      imports: [
        HttpClientTestingModule,

        RouterTestingModule,
        StoreModule.forRoot({}, {}),
      ],
      providers: [
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(Store);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
