import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/usuario.service';

@Component({
  selector: 'app-recuperar-contrasena',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.scss']
})
export class RecuperarContrasenaComponent {
  email: string = '';
  currentUser: any;

  constructor(private userService: UserService,
              private router: Router
  ) {
    this.currentUser = this.userService.getCurrentUser(); 
  }

  logout() {
    this.userService.logout(); // Elimina el usuario autenticado
    this.currentUser = null;
    this.router.navigate(['/index']);
  }

  onSubmit() {
    alert('Se ha enviado un correo con las instrucciones para recuperar la contraseña.');
    this.email = '';
  }
}
