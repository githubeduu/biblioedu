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

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar currentUser en ngOnInit', () => {
    component.ngOnInit();
    expect(mockUserService.getCurrentUser).toHaveBeenCalled();
    expect(component.currentUser).toEqual({ id: 1, name: 'Test User' });
  });

  it('debería obtener productos en ngOnInit', () => {
    const mockProducts = [{ id: 1, titulo: 'Book 1' }, { id: 2, titulo: 'Book 2' }];
    mockLibroService.getAllBook.and.returnValue(of(mockProducts));
    component.ngOnInit();
    expect(component.products).toEqual(mockProducts);
  });

 

  it('debería llamar a agregarAlCarro y mostrar una alerta al agregar un producto al carrito', () => {
    spyOn(window, 'alert');
    const mockProduct = { id: 1, titulo: 'Test Product' };

    component.agregarAlCarro(mockProduct);

    expect(mockCarroService.agregarAlCarro).toHaveBeenCalledWith(mockProduct);
    expect(window.alert).toHaveBeenCalledWith('Producto Agregado correctamente');
  });

  it('debería llamar a logout y restablecer currentUser', () => {
    component.logout();
    expect(mockUserService.logout).toHaveBeenCalled();
    expect(component.currentUser).toBeNull();
  });

  it('debería filtrar los productos según el término de búsqueda (searchTerm)', () => {
    // Mock de productos
    component.products = [
      { id: 1, titulo: 'Angular Basics', autor: 'John Doe', genero: 'Programming' },
      { id: 2, titulo: 'Learning TypeScript', autor: 'Jane Smith', genero: 'Programming' },
      { id: 3, titulo: 'Cooking 101', autor: 'Chef Mike', genero: 'Cooking' },
    ];
  
    // Configurar el término de búsqueda
    component.searchTerm = 'angular';
  
    // Llamar a la función buscarProducto
    component.buscarProducto(new Event('submit'));
  
    // Validar resultados
    expect(component.filteredProducts).toEqual([
      { id: 1, titulo: 'Angular Basics', autor: 'John Doe', genero: 'Programming' },
    ]);
  });
  

  it('debería devolver un array vacío si ningún producto coincide con el término de búsqueda (searchTerm)', () => {
    // Mock de productos
    component.products = [
      { id: 1, titulo: 'Angular Basics', autor: 'John Doe', genero: 'Programming' },
      { id: 2, titulo: 'Learning TypeScript', autor: 'Jane Smith', genero: 'Programming' },
    ];
  
    // Configurar un término de búsqueda que no coincida
    component.searchTerm = 'Cooking';
  
    // Llamar a la función buscarProducto
    component.buscarProducto(new Event('submit'));
  
    // Validar resultados
    expect(component.filteredProducts).toEqual([]);
  });
  

});



