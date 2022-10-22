import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionDialogComponent } from './confirmacion-dialog.component';

describe('ComfirmacionDialogComponent', () => {
  let component: ConfirmacionDialogComponent;
  let fixture: ComponentFixture<ConfirmacionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmacionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmacionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
