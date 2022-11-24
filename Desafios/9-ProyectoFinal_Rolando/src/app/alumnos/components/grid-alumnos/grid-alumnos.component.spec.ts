import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridAlumnosComponent } from './grid-alumnos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';


describe('GridAlumnosComponent', () => {
  let component: GridAlumnosComponent;
  let fixture: ComponentFixture<GridAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridAlumnosComponent ],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: []},
        {provide: MatDialog, useValue: []},
        {provide: MatSort, useValue: []},
        {provide: ActivatedRoute, useValue: []},
        {provide: Store, useValue: []},
      ]
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
