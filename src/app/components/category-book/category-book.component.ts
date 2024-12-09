import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LibroService } from '../../services/libro-service/libro.service';
import { CarroService } from '../../services/carro-service/carro.service';
import { UserService } from '../../services/usuario-service/usuario.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-category-book',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // Agrega HttpClientModule a imports
  templateUrl: './category-book.component.html',
  styleUrls: ['./category-book.component.scss']
})
export class CategoryBookComponent implements OnInit {
  currentUser: any;
  products: any[] = [];
  filteredProducts: any[] = [];
  searchTerm: string = '';

  constructor(
    private libroService: LibroService,
    private carroService: CarroService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();

    this.libroService.getAllBook().subscribe(
      (data: any[]) => {
        console.log('Received data:', data); // Verifica los datos recibidos en la consola
        if (Array.isArray(data)) {
          this.products = data;
          this.filteredProducts = data;
          console.log('Products:', this.products); // Verifica productos filtrados
        } else {
          console.error('Response format is unexpected:', data);
          this.products = []; // Manejo de respuesta inesperada
        }
      },
      error => {
        console.error('Error fetching products:', error); // Manejo de errores
        // Puedes añadir lógica adicional para manejar errores
      }
    );
  }

  buscarProducto(event: Event): void {
    event.preventDefault();
    const search = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.titulo.toLowerCase().includes(search) ||
      product.autor.toLowerCase().includes(search) ||
      product.genero.toLowerCase().includes(search)
    );
  }

  logout() {
    this.userService.logout();
    this.currentUser = null;
  }

  agregarAlCarro(producto: any) {
    this.carroService.agregarAlCarro(producto);
    alert('Producto Agregado correctamente');
  }
}