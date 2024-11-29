import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryBookComponent } from './category-book.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CarroService } from '../../services/carro-service/carro.service';
import { LibroService } from '../../services/libro-service/libro.service';
import { UserService } from '../../services/usuario-service/usuario.service';

describe('CategoryBookComponent', () => {
  let component: CategoryBookComponent;
  let fixture: ComponentFixture<CategoryBookComponent>;

  // Mock para CarroService
  const mockCarroService = {
    agregarAlCarro: jasmine.createSpy('agregarAlCarro'),
  };

  // Mock para LibroService
  const mockLibroService = {
    getAllBook: jasmine.createSpy('getAllBook').and.returnValue(of([])),
  };

  // Mock para UserService
  const mockUserService = {
    getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue({ id: 1, name: 'Test User' }),
    logout: jasmine.createSpy('logout'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      providers: [
        { provide: CarroService, useValue: mockCarroService },
        { provide: LibroService, useValue: mockLibroService },
        { provide: UserService, useValue: mockUserService },
        { provide: ActivatedRoute, useValue: { params: of({ id: 123 }) } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize currentUser on ngOnInit', () => {
    component.ngOnInit();
    expect(mockUserService.getCurrentUser).toHaveBeenCalled();
    expect(component.currentUser).toEqual({ id: 1, name: 'Test User' });
  });

  it('should fetch products on ngOnInit', () => {
    const mockProducts = [{ id: 1, titulo: 'Book 1' }, { id: 2, titulo: 'Book 2' }];
    mockLibroService.getAllBook.and.returnValue(of(mockProducts));
    component.ngOnInit();
    expect(component.products).toEqual(mockProducts);
  });

  // it('should handle error when fetching products', () => {
  //   mockLibroService.getAllBook.and.returnValue(throwError(() => new Error('Error fetching products')));
    
  //   spyOn(console, 'error'); // Asegúrate de espiar el console.error si lo usas para manejar errores.
  
  //   component.ngOnInit();
  
  //   expect(component.products).toEqual([]); // Asegúrate de que los productos estén vacíos
  //   expect(console.error).toHaveBeenCalledWith('Error fetching products', jasmine.any(Error));
  // }); 
  
  

  it('should call agregarAlCarro and show an alert when adding a product to the cart', () => {
    spyOn(window, 'alert');
    const mockProduct = { id: 1, titulo: 'Test Product' };

    component.agregarAlCarro(mockProduct);

    expect(mockCarroService.agregarAlCarro).toHaveBeenCalledWith(mockProduct);
    expect(window.alert).toHaveBeenCalledWith('Producto Agregado correctamente');
  });

  it('should call logout and reset currentUser', () => {
    component.logout();
    expect(mockUserService.logout).toHaveBeenCalled();
    expect(component.currentUser).toBeNull();
  });
});
