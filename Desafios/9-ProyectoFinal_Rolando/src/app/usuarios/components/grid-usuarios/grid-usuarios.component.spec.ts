import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridUsuariosComponent } from './grid-usuarios.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';


describe('GridUsuariosComponent', () => {
  let component: GridUsuariosComponent;
  let fixture: ComponentFixture<GridUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridUsuariosComponent ],
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

    fixture = TestBed.createComponent(GridUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
