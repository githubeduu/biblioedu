import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarroComponent } from './carro.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CarroService } from '../../services/carro-service/carro.service';
import { UserService } from '../../services/usuario-service/usuario.service';

class MockCarroService {
  private mockItems = [{ id: 1, name: 'Product 1', precio: 10, cantidad: 1 }];
  getItems = jasmine.createSpy('getItems').and.returnValue(this.mockItems);
  borrarDeCarro = jasmine.createSpy('borrarDeCarro');
  getTotal = jasmine.createSpy('getTotal').and.returnValue(100); // Retorna un total simulado
}

class MockUserService {
  getCurrentUser = jasmine.createSpy('getCurrentUser').and.returnValue({ id: 1, name: 'Test User' });
  logout = jasmine.createSpy('logout');
}

describe('CarroComponent', () => {
  let component: CarroComponent;
  let fixture: ComponentFixture<CarroComponent>;
  let carroService: MockCarroService;
  let userService: MockUserService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: CarroService, useClass: MockCarroService },
        { provide: UserService, useClass: MockUserService }
      ]
    }).compileComponents();

    carroService = TestBed.inject(CarroService) as unknown as MockCarroService;
    userService = TestBed.inject(UserService) as unknown as MockUserService;
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar currentUser en ngOnInit', () => {
    component.ngOnInit();
    expect(userService.getCurrentUser).toHaveBeenCalled();
    expect(component.currentUser).toEqual({ id: 1, name: 'Test User' });
  });

  it('debería llamar a borrarDeCarro cuando se elimina un elemento', () => {
    const mockItem = { id: 1, name: 'Product 1', precio: 10, cantidad: 1 };
    component.borrarDeCarro(mockItem);
    expect(carroService.borrarDeCarro).toHaveBeenCalledWith(mockItem);
  });

  it('debería llamar a logout y establecer currentUser a null', () => {
    component.logout();
    expect(userService.logout).toHaveBeenCalled();
    expect(component.currentUser).toBeNull();
  });

  it('debería rastrear los elementos por su ID usando trackById', () => {
    const mockItem = { id: 1, name: 'Product 1', precio: 10, cantidad: 1 };
    expect(component.trackById(0, mockItem)).toBe(1);
  });

  it('debería establecer isLoading en true y navegar a payment al llamar a pagar', (done) => {
    spyOn(router, 'navigate');

    component.pagar();
    expect(component.isLoading).toBeTrue();

    setTimeout(() => {
      expect(router.navigate).toHaveBeenCalledWith(['/payment']);
      expect(component.isLoading).toBeFalse();
      done();
    }, 2000);
  });

  it('debería obtener elementos desde CarroService', () => {
    const items = component.carroService.getItems();
    expect(carroService.getItems).toHaveBeenCalled();
    expect(items).toEqual([{ id: 1, name: 'Product 1', precio: 10, cantidad: 1 }]);
  });
});
