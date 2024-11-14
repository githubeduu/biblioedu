import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from '../../services/usuario.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: UserService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, LoginComponent, HttpClientTestingModule, HttpClientModule],
      providers: [UserService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);

    // Mock para los elementos de input
    component.usernameInput = { nativeElement: { value: 'wrongUser' } } as ElementRef;
    component.passwordInput = { nativeElement: { value: 'wrongPass' } } as ElementRef;

    spyOn(userService, 'authenticate').and.returnValue(of({ status: 401, body: null }));
    spyOn(window, 'alert');

    fixture.detectChanges();
  });

  // Prueba para verificar la alerta en caso de inicio de sesión incorrecto
  it('debería mostrar una alerta en caso de inicio de sesión incorrecto', () => {
    const event = new Event('submit');
    component.onSubmit(event);

    expect(window.alert).toHaveBeenCalledWith('Contraseña incorrecta');
  });
});
