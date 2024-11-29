import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';  // Importa HttpErrorResponse
import { UserService } from '../../services/usuario-service/usuario.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('username') usernameInput!: ElementRef;
  @ViewChild('password') passwordInput!: ElementRef;

  constructor(private router: Router, private userService: UserService) {}

  onSubmit(event: Event) {
    event.preventDefault();
  
    const username = this.usernameInput.nativeElement.value.trim();
    const password = this.passwordInput.nativeElement.value.trim();
  
    if (!username || !password) {
      alert('Por favor, completa ambos campos.');
      return;
    }
  
    this.userService.authenticate(username, password).subscribe(
      (response: any) => {
        if (response.status === 200) {
          alert('Contraseña válida');
          const user = response.body;
          this.userService.setCurrentUser(user);
          this.router.navigate(['/index']);
        } else {
          alert('Contraseña incorrecta');
        }
      },
      (error: HttpErrorResponse) => {
        // Distingue errores de credenciales inválidas
        if (error.status === 401) {
          alert('Contraseña incorrecta');
        } else {
          alert('Error de autenticación');
          console.error('Error al autenticar:', error);
        }
      }
    );
  }
  
}