import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CuentaComponent } from './cuenta.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/usuario-service/usuario.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('CuentaComponent', () => {
  let component: CuentaComponent;
  let fixture: ComponentFixture<CuentaComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id: 123 }) }
        },
        {
          provide: UserService,
          useValue: {
            getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue({
              nombre: 'Eduardo Carvajal',
              rut: '12345678-9',
              direccion: 'San pablo 3900',
              comuna: 'Santiago'
            }),
            updateUser: jasmine.createSpy('updateUser').and.returnValue(of({})),
            setCurrentUser: jasmine.createSpy('setCurrentUser'),
            logout: jasmine.createSpy('logout')
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con los valores actuales del usuario', () => {
    expect(component.miFormulario.value).toEqual({
      nombre: 'Eduardo Carvajal',
      rut: '12345678-9',
      direccion: 'San pablo 3900',
      comuna: 'Santiago'
    });
  });

  it('debería llamar a updateUser y setCurrentUser al enviar el formulario', () => {
    component.miFormulario.setValue({
      nombre: 'Juan Perez',
      rut: '98765432-1',
      direccion: 'Providencia 1408',
      comuna: 'Santiago'
    });

    component.submitForm();

    expect(userService.updateUser).toHaveBeenCalledWith({
      nombre: 'Juan Perez',
      rut: '98765432-1',
      direccion: 'Providencia 1408',
      comuna: 'Santiago'
    });
    expect(userService.setCurrentUser).toHaveBeenCalledWith({
      nombre: 'Juan Perez',
      rut: '98765432-1',
      direccion: 'Providencia 1408',
      comuna: 'Santiago'
    });
  });
});
