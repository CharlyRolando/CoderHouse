import { TestBed } from '@angular/core/testing';
import { AlumnosService } from './alumnos.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('AlumnosService', () => {
  let service: AlumnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AlumnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
