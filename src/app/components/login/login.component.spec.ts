import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from '../../services/usuario-service/usuario.service';
import { of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: UserService;
  let httpTestingController: HttpTestingController;
  let router: Router;
  let alertSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, LoginComponent], // Importa el componente standalone
      providers: [UserService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);

    // Mock para los elementos de input
    component.usernameInput = { nativeElement: { value: '' } } as ElementRef;
    component.passwordInput = { nativeElement: { value: '' } } as ElementRef;

    alertSpy = spyOn(window, 'alert').and.callThrough(); // Configura correctamente el espía para alert
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('debería mostrar una alerta en caso de inicio de sesión incorrecto', () => {
    const event = new Event('submit');
  
    component.usernameInput.nativeElement.value = 'wrongUser';
    component.passwordInput.nativeElement.value = 'wrongPass';
  
    component.onSubmit(event);
  
    const req = httpTestingController.expectOne('http://localhost:8082/usuario/signin');
    expect(req.request.method).toBe('POST');
    
    // Simula la respuesta de error 401 del servidor
    req.flush({ message: 'Invalid credentials' }, { status: 401, statusText: 'Unauthorized' });
  
    expect(alertSpy).toHaveBeenCalledWith('Contraseña incorrecta');
  });
  

  it('debería mostrar una alerta si los campos están vacíos y no llamar a authenticate', () => {
    const event = new Event('submit');

    component.usernameInput.nativeElement.value = '';
    component.passwordInput.nativeElement.value = '';

    component.onSubmit(event);

    expect(alertSpy).toHaveBeenCalledWith('Por favor, completa ambos campos.');
  });

  it('debería navegar a "/index" en caso de inicio de sesión exitoso', () => {
    const event = new Event('submit');
    spyOn(router, 'navigate');

    component.usernameInput.nativeElement.value = 'validUser';
    component.passwordInput.nativeElement.value = 'validPass';

    component.onSubmit(event);

    const req = httpTestingController.expectOne('http://localhost:8082/usuario/signin');
    expect(req.request.method).toBe('POST');
    req.flush({ name: 'Usuario Test' }, { status: 200, statusText: 'OK' });

    expect(alertSpy).toHaveBeenCalledWith('Contraseña válida');
    expect(router.navigate).toHaveBeenCalledWith(['/index']);
  });
});
