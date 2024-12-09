// index.component.ts
import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/usuario-service/usuario.service';
import { LibroService } from '../../services/libro-service/libro.service';
import { catchError, of, tap } from 'rxjs';



@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements AfterViewInit {
  currentUser: any;
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private readonly userService: UserService,
    private readonly libroService: LibroService,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
  
    this.libroService.getAllBook().pipe(
      tap((data: any[]) => {
        if (Array.isArray(data)) {
          this.products = data.filter(book => book.id >= 100);
        } else {
          this.products = [];
        }
      }),
      catchError((error) => {
        console.error('Error fetching products:', error);
        this.products = [];
        return of([]);
      })
    ).subscribe(); // Mantén la suscripción activa para que se ejecute el flujo.
  }

  logout() {
    this.userService.logout();
    this.currentUser = null;
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      let currentSlide: number = 0;
      const slides = this.el.nativeElement.querySelectorAll('.carousel-item');
      const totalSlides: number = slides.length;

      if (totalSlides > 0) {
        this.renderer.addClass(slides[currentSlide], 'active');

        setInterval(() => {
          this.renderer.removeClass(slides[currentSlide], 'active');
          currentSlide = (currentSlide + 1) % totalSlides;
          this.renderer.addClass(slides[currentSlide], 'active');
        }, 10000);
      }
    }
  }

  
}
