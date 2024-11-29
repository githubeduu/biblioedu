import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MantenedorProductosComponent } from './mantenedor-productos.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LibroService } from '../../services/libro-service/libro.service';
import { UserService } from '../../services/usuario-service/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('MantenedorProductosComponent', () => {
  let component: MantenedorProductosComponent;
  let fixture: ComponentFixture<MantenedorProductosComponent>;
  let mockLibroService: any;
  let mockUserService: any;

  beforeEach(async () => {
    // Mock de los servicios
    mockLibroService = {
      getAllBook: jasmine.createSpy('getAllBook').and.returnValue(of([])),
      addBook: jasmine.createSpy('addBook').and.returnValue(of({})),
      UpdateBook: jasmine.createSpy('UpdateBook').and.returnValue(of({})),
      deleteBook: jasmine.createSpy('deleteBook').and.returnValue(of({})),
    };

    mockUserService = {
      getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue({ id: 1, nombre: 'Admin', rolId: 1 }),
      logout: jasmine.createSpy('logout') // Aquí definimos correctamente el espía
    };

    await TestBed.configureTestingModule({
      imports: [MantenedorProductosComponent, FormsModule],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: LibroService, useValue: mockLibroService },
        { provide: ActivatedRoute, useValue: { params: of({ id: 123 }) } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenedorProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
    expect(component['userService']).toBeTruthy();
    expect(component['userService'].logout).toBeDefined();
  });

  it('debería llamar a la función de logout al presionar "Cerrar Sesión"', () => {
    component.currentUser = { id: 1, nombre: 'Admin', rolId: 1 };
    fixture.detectChanges();

    const logoutButton = fixture.debugElement.query(By.css('a.nav-link.cursor-pointer'));
    expect(logoutButton).toBeTruthy();

    component.logout();
    fixture.detectChanges();

    expect(mockUserService.logout).toHaveBeenCalled();
    expect(component.currentUser).toBeNull();
  });

  it('debería abrir el modal para agregar un producto', () => {
    component.openModal(false);
    expect(component.showModal).toBeTrue();
    expect(component.isEditMode).toBeFalse();
  });

  it('debería abrir el modal en modo edición', () => {
    component.openModal(true);
    expect(component.showModal).toBeTrue();
    expect(component.isEditMode).toBeTrue();
  });

  it('debería cerrar el modal y reiniciar el formulario', () => {
    component.showModal = true;
    component.isEditMode = true;
    component.productoSeleccionado = { id: 1, titulo: 'Libro' };
    component.closeModal();
    expect(component.showModal).toBeFalse();
    expect(component.isEditMode).toBeFalse();
    expect(component.productoSeleccionado).toBeNull();
  });

  it('debería abrir el modal de confirmación de eliminación', () => {
    const product = { id: 1, titulo: 'Libro' };
    component.openDeleteModal(product);
    expect(component.showDeleteModal).toBeTrue();
    expect(component.productToDelete).toEqual(product);
  });

  it('debería cerrar el modal de eliminación', () => {
    component.showDeleteModal = true;
    component.productToDelete = { id: 1, titulo: 'Libro' };
    component.closeDeleteModal();
    expect(component.showDeleteModal).toBeFalse();
    expect(component.productToDelete).toBeNull();
  });

  it('debería guardar un nuevo producto', () => {
    const newProduct = { titulo: 'Nuevo Libro', autor: 'Autor', anioPublicacion: '2023' };
    component.nuevoProducto = newProduct;
    component.isEditMode = false;

    component.guardarProducto();
    expect(mockLibroService.addBook).toHaveBeenCalledWith(newProduct);
  });

  it('debería actualizar un producto existente', () => {
    const existingProduct = { id: 1, titulo: 'Libro Actualizado', autor: 'Autor' };
    component.nuevoProducto = existingProduct;
    component.isEditMode = true;
    component.productoSeleccionado = existingProduct;

    component.guardarProducto();
    expect(mockLibroService.UpdateBook).toHaveBeenCalledWith(existingProduct.id, existingProduct);
  });

  it('debería eliminar un producto', () => {
    const productToDelete = { id: 1, titulo: 'Libro' };
    component.productToDelete = productToDelete;

    component.eliminarProducto();
    expect(mockLibroService.deleteBook).toHaveBeenCalledWith(productToDelete.id);
  });

  it('debería seleccionar un producto para editar', () => {
    const products = [{ id: 1, titulo: 'Libro 1' }, { id: 2, titulo: 'Libro 2' }];
    component.products = products;

    component.editarProducto(1);
    expect(component.productoSeleccionado).toEqual(products[0]);
    expect(component.nuevoProducto).toEqual(products[0]);
    expect(component.showModal).toBeTrue();
    expect(component.isEditMode).toBeTrue();
  });
});
