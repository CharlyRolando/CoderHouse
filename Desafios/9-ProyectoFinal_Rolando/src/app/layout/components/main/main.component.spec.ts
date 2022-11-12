import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import {RouterTestingModule} from '@angular/router/testing'


describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule
      ],
      declarations: [ MainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
