import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/usuario.service';
import { HttpClientModule } from '@angular/common/http';

/**
 * @description
 * Componente para la gestión de la cuenta de usuario.
 * Permite al usuario ver y actualizar su información personal.
 */

/**
 * @usageNotes
 * Este componente muestra la información actual del usuario y permite actualizarla a través de un formulario.
 * El usuario debe estar autenticado para acceder a este componente.
 */

@Component({
  selector: 'app-cuenta',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './cuenta.component.html',
  styleUrl: './cuenta.component.scss'
})

export class CuentaComponent implements OnInit {
  currentUser: any;
  miFormulario: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.miFormulario = this.fb.group({
      nombre: [''],
      rut: [''],
      direccion: [''],
      comuna: ['']
    });
  }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();

    this.miFormulario.patchValue({
      nombre: this.currentUser.nombre,
      rut: this.currentUser.rut,
      direccion: this.currentUser.direccion,
      comuna: this.currentUser.comuna
    });
  }

  submitForm() {
    const updatedUser = {
      ...this.currentUser,
      ...this.miFormulario.value
    };

    this.userService.updateUser(updatedUser).subscribe(() => {
      this.userService.setCurrentUser(updatedUser);
      alert('Usuario actualizado');
    });
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/index']);
  }
}