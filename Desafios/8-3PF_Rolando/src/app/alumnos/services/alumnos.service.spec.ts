import { getTestBed, TestBed } from '@angular/core/testing';
import { AlumnosService } from './alumnos.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { catchError, map, Observable, of, pipe, take, throwError, timeoutWith } from 'rxjs';
import { Alumno } from '../interfaces/alumno';
import { environment } from 'src/environments/environment';


describe('AlumnosService', () => {

  let httpClientSpy: {
    get: jasmine.Spy;
    put: jasmine.Spy;
    post: jasmine.Spy;
    delete: jasmine.Spy;
  };

  let service: AlumnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);

    service = new AlumnosService(httpClientSpy as any);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  /* MIS TEST ****************************************************/
  it('check getAlumnos()', (done: DoneFn) => {

    const mockAlumnos: Alumno[] = [
      { id: '1', nombre: 'uno', apellido: 'unouno', sexo: 1, edad: 20, perfil: '', foto: '' },
      { id: '2', nombre: 'dos', apellido: 'dosdos', sexo: 2, edad: 30, perfil: '', foto: '' },
      { id: '3', nombre: 'tres', apellido: 'trestres', sexo: 1, edad: 30, perfil: '', foto: '' }
    ];

    httpClientSpy.get.and.returnValue(of(mockAlumnos));

    service.getAlumnos().subscribe((alumnos) => {
      expect(alumnos).toEqual(mockAlumnos);
      done();
    })

  });


  it('check getAlumno("2")', (done: DoneFn) => {

    const mockAlumno: Alumno = { id: '2', nombre: 'dos', apellido: 'dosdos', sexo: 2, edad: 30, perfil: '', foto: '' };

    httpClientSpy.get.and.returnValue(of(mockAlumno));

    service.getAlumno('2').subscribe((alumno) => {
      expect(alumno).toEqual(mockAlumno);
      done();
    })

  });


  it('check getAlumno("")', (done: DoneFn) => {

    const inicializado = { id: '', nombre: '', apellido: '', sexo: 0, edad: 0, perfil: '', foto: '' };

    service.getAlumno('').subscribe((alumno) => {
      expect(alumno).toEqual(inicializado);
      done();
    })

  });


  it('check addtAlumno(alumno)', (done: DoneFn) => {

    const mockAlumno: Alumno = { id: '4', nombre: 'cuatro', apellido: 'cuatrocuatro', sexo: 2, edad: 22, perfil: '', foto: '' };

    httpClientSpy.post.and.returnValue(of(mockAlumno));

    service.addAlumno(mockAlumno).subscribe((alumno) => {
      expect(alumno).toEqual(mockAlumno);
      done();
    })

  });


  it('check editAlumno(alumno)', (done: DoneFn) => {

    const mockAlumno: Alumno = { id: '2', nombre: 'cuatro', apellido: 'cuatrocuatro', sexo: 2, edad: 22, perfil: '', foto: '' };

    httpClientSpy.put.and.returnValue(of(mockAlumno));

    service.editAlumno(mockAlumno).subscribe((alumno) => {
      expect(alumno).toEqual(mockAlumno);
      done();
    })

  });


  it('check deleteAlumno(alumno)', (done: DoneFn) => {

    const vacio = {};
    httpClientSpy.delete.and.returnValue(of(vacio));

    service.deleteAlumno('2').subscribe((resp) => {
      expect(resp).toEqual(vacio);
      done();
    })

  });


  it('check handleError("")', (done: DoneFn) => {
    service.handleError('').pipe(take(1)).subscribe({
      next: () => { },
      error: (error) => {
        expect(error).toEqual('undefined');
        done();
      }
    });
  });


  it('check handleError(null)', (done: DoneFn) => {
    service.handleError(null).pipe(take(1)).subscribe({
      next: () => { },
      error: (error) => {
        expect(error).toEqual('nulo');
        done();
      }
    });
  });


  it('check handleError(err.error)', (done: DoneFn) => {
    let mierror: ErrorEvent = new ErrorEvent('mierror');

    service.handleError({ error: mierror }).pipe(take(1)).subscribe({
      next: () => { },
      error: (error) => {
        expect(error).toEqual('Ocurrió un error: ');
        done();
      }
    });
  });


  it('check inicializarAlumno()', () => {
    const a = {
      id: '',
      nombre: '',
      apellido: '',
      sexo: 0,
      edad: 0,
      perfil: '',
      foto: ''
    };
    expect(service.inicializarAlumno()).toEqual(a);
  });
  /***************************************************************/



});
