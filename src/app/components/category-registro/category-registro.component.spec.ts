import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryRegistroComponent } from './category-registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/usuario.service';

describe('CategoryRegistroComponent', () => {
  let component: CategoryRegistroComponent;
  let fixture: ComponentFixture<CategoryRegistroComponent>;
  let router: Router;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['getCurrentUser', 'logout', 'addUser']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        HttpClientModule,
        CommonModule,
        CategoryRegistroComponent // Importa el componente autónomo aquí
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: 123 }) } },
        { provide: UserService, useValue: spy }
      ]
    }).compileComponents();

    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryRegistroComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('debería crear el formulario con los controles correctos', () => {
    expect(component.miFormulario.contains('username')).toBe(true);
    expect(component.miFormulario.contains('password')).toBe(true);
    expect(component.miFormulario.contains('name')).toBe(true);
    expect(component.miFormulario.contains('rut')).toBe(true);
    expect(component.miFormulario.contains('direccion')).toBe(true);
    expect(component.miFormulario.contains('comuna')).toBe(true);
    expect(component.miFormulario.contains('rolId')).toBe(true);
  });

  it('debería validar el formulario y manejar errores de validación al enviarlo', () => {
    component.miFormulario.setValue({
      username: '',
      password: '123', // Contraseña demasiado corta
      name: '',
      rut: '',
      direccion: '',
      comuna: '',
      rolId: 3
    });

    component.submitForm();

    expect(component.miFormulario.valid).toBe(false);
    expect(component.miFormulario.get('username')?.hasError('required')).toBe(true);
    expect(component.miFormulario.get('password')?.hasError('invalidLength')).toBe(true);
    expect(component.miFormulario.get('name')?.hasError('required')).toBe(true);
    expect(component.miFormulario.get('rut')?.hasError('required')).toBe(true);
    expect(component.miFormulario.get('direccion')?.hasError('required')).toBe(true);
    expect(component.miFormulario.get('comuna')?.hasError('required')).toBe(true);
    expect(component.miFormulario.get('rolId')?.hasError('required')).toBe(false);
  });

  it('debería navegar a la página de índice después de enviar el formulario exitosamente', () => {
    const navigateSpy = spyOn(router, 'navigate');
    userServiceSpy.addUser.and.returnValue(of({}));

    component.miFormulario.setValue({
      username: 'testuser',
      password: 'Password#123',
      name: 'Test User',
      rut: '123456789', // Rut válido
      direccion: 'Calle 123',
      comuna: 'Santiago',
      rolId: 3
    });

    component.submitForm();

    expect(component.miFormulario.valid).toBe(true);
    expect(navigateSpy).toHaveBeenCalledWith(['/index']);
  });
});
