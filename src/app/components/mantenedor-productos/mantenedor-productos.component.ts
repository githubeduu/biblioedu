import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LibroService } from '../../services/libro-service/libro.service';
import { UserService } from '../../services/usuario-service/usuario.service';
import { CarroService } from '../../services/carro-service/carro.service';

/**
 * @description
 * Componente para el mantenimiento de productos.
 * Permite agregar, actualizar y eliminar productos.
 *
 * @usageNotes
 * Este componente muestra una lista de productos y permite agregar nuevos productos,
 * actualizar productos existentes y eliminar productos seleccionados.
 */
@Component({
  selector: 'app-mantenedor-productos',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
  templateUrl: './mantenedor-productos.component.html',
  styleUrls: ['./mantenedor-productos.component.scss']
})
export class MantenedorProductosComponent implements OnInit {
  constructor(
    private userService: UserService,
    private libroService: LibroService
  ) {}

  carroService = inject(CarroService);
  currentUser: any;
  showModal: boolean = false;
  isEditMode: boolean = false;
  products: any[] = [];
  filteredProducts: any[] = [];
  nuevoProducto: any = {
    titulo: '',
    autor: '',    
    anioPublicacion: '',
    genero: '',
    imagenurl: '',
    precio: ''
  };
  productoSeleccionado: any = null;
  showDeleteModal: boolean = false;
  productToDelete: any = null;

  /**
   * Abre el modal para agregar o editar un producto.
   * @param editMode Indica si se está editando un producto existente.
   */
  openModal(editMode: boolean = false) {
    this.showModal = true;
    this.isEditMode = editMode;
  }

  /**
   * Cierra el modal de edición/agregación de producto.
   */
  closeModal() {
    this.showModal = false;
    this.isEditMode = false;
    this.productoSeleccionado = null;
    this.resetForm();
  }

  /**
   * Abre el modal para confirmar la eliminación de un producto.
   * @param product Producto a eliminar.
   */
  openDeleteModal(product: any) {
    this.showDeleteModal = true;
    this.productToDelete = product;
  }

  /**
   * Cierra el modal de eliminación de producto.
   */
  closeDeleteModal() {
    this.showDeleteModal = false;
    this.productToDelete = null;
  }

  /**
   * Reinicia el formulario de producto nuevo.
   */
  resetForm() {
    this.nuevoProducto = {
      titulo: '',
      autor: '',    
      anioPublicacion: '',
      imagenurl: '',
      precio: 0
    };
  }

  /**
   * Cierra la sesión del usuario actual.
   */
  logout() {
    this.userService.logout();
    this.currentUser = null;
  }

  /**
   * Inicializa el componente.
   * Obtiene la lista de productos desde el servicio.
   */
  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser(); 
    this.libroService.getAllBook().subscribe(
      (data: any[]) => {
        console.log('Received data:', data);
        if (Array.isArray(data)) {
          this.products = data;
        } else {
          console.error('Response format is unexpected:', data);
          this.products = [];
        }
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  openAddBookModal() {
    this.isEditMode = false;
    this.nuevoProducto = {
      titulo: '',
      autor: '',
      anioPublicacion: '',
      imagenurl: '',
      categoriaid: 'Aventura',
      precio: 0
    };
    this.showModal = true;
  }

  /**
   * Guarda un producto, ya sea agregándolo o actualizándolo.
   * Si está en modo edición, actualiza el producto existente. De lo contrario, agrega un nuevo producto.
   */
  guardarProducto() {
    if (this.isEditMode && this.productoSeleccionado) {
      // Lógica para actualizar el producto existente
      this.libroService.UpdateBook(this.productoSeleccionado.id, this.nuevoProducto).subscribe(
        (response) => {
          console.log('Producto actualizado correctamente:', response);
          this.ngOnInit();
          this.closeModal();
          alert('Producto actualizado correctamente');
        },
        (error) => {
          console.error('Error al actualizar producto:', error);
          alert('Error al actualizar producto');
        }
      );
    } else {
      // Lógica para agregar un nuevo producto
      console.log('Guardando producto:', this.nuevoProducto);
      this.libroService.addBook(this.nuevoProducto).subscribe(
        (response) => {
          console.log('Producto agregado correctamente:', response);
          this.ngOnInit();
          this.closeModal();
          alert('Producto agregado correctamente');
        },
        (error) => {
          console.error('Error al agregar producto:', error);
          alert('Error al agregar producto');
        }
      );
    }
  }

  /**
   * Elimina un producto.
   * Elimina el producto seleccionado y actualiza la lista de productos.
   */
  eliminarProducto() {
    if (this.productToDelete) {
      this.libroService.deleteBook(this.productToDelete.id).subscribe(
        (response) => {
          console.log('Producto eliminado correctamente:', response);
          this.ngOnInit();
          this.closeDeleteModal();
          alert('Producto eliminado correctamente');
        },
        (error) => {
          console.error('Error al eliminar producto:', error);
          alert('Error al eliminar producto');
        }
      );
    }
  }

  /**
   * Abre el modal para editar un producto existente.
   * @param id ID del producto a editar.
   */
  editarProducto(id: number): void {
    const producto = this.products.find(p => p.id === id);
    if (producto) {
      this.productoSeleccionado = producto;
      this.nuevoProducto = { ...producto };
      this.openModal(true);
    }
  }
}
