import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { LibroService } from '../../services/libro.service';

@Component({
  selector: 'app-category-book',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule], // Agrega HttpClientModule a imports
  templateUrl: './category-book.component.html',
  styleUrls: ['./category-book.component.scss']
})
export class CategoryBookComponent implements OnInit {
  //currentUser: any;
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(
    private libroService: LibroService
    // private carroService: CarroService,
    // private userService: UserService,
  ) {}

  ngOnInit(): void {
    //this.currentUser = this.userService.getCurrentUser();

    this.libroService.getBookByGenero('Aventura').subscribe(
      (data: any[]) => {
        console.log('Received data:', data); // Verifica los datos recibidos en la consola
        if (Array.isArray(data)) {
          this.products = data;
          this.filteredProducts = this.products.filter(product => product.genero === 'Aventura');
          console.log('Filtered products:', this.filteredProducts); // Verifica productos filtrados
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

  // logout() {
  //   this.userService.logout();
  //   this.currentUser = null;
  // }

  // agregarAlCarro(producto: any) {
  //   this.carroService.agregarAlCarro(producto);
  //   alert('Producto Agregado correctamente');
  // }
}