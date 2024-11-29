import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarContrasenaComponent } from './recuperar-contrasena.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../services/usuario-service/usuario.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('RecuperarContrasenaComponent', () => {
  let component: RecuperarContrasenaComponent;
  let fixture: ComponentFixture<RecuperarContrasenaComponent>;
  let mockUserService: any;
  let router: Router;

  beforeEach(async () => {
    mockUserService = {
      getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue({ id: 1, nombre: 'Admin' }),
      logout: jasmine.createSpy('logout')
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      providers: [
        { provide: UserService, useValue: mockUserService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarContrasenaComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar currentUser correctamente', () => {
    expect(component.currentUser).toEqual({ id: 1, nombre: 'Admin' });
    expect(mockUserService.getCurrentUser).toHaveBeenCalled();
  });

  it('debería llamar a logout y redirigir a /index', () => {
    component.logout();
    expect(mockUserService.logout).toHaveBeenCalled();
    expect(component.currentUser).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/index']);
  });

  it('debería mostrar un alert y resetear el email al enviar el formulario', () => {
    spyOn(window, 'alert');
    component.email = 'test@example.com';

    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Se ha enviado un correo con las instrucciones para recuperar la contraseña.');
    expect(component.email).toBe('');
  });

  it('debería mostrar el formulario correctamente en el DOM', () => {
    const compiled = fixture.debugElement.nativeElement;
    const input = compiled.querySelector('input[type="email"]');
    const button = compiled.querySelector('button[type="submit"]');

    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
  });
});
