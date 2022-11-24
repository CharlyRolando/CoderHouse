import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridCursosComponent } from './grid-cursos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';


describe('GridCursosComponent', () => {
  let component: GridCursosComponent;
  let fixture: ComponentFixture<GridCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridCursosComponent ],
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

    fixture = TestBed.createComponent(GridCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
