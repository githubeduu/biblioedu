import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/usuario-service/usuario.service';

/**
 * @description
 * Componente para el registro de usuarios en una categoría específica.
 * Permite a los usuarios registrarse ingresando su información personal.
 *
 * @usageNotes
 * Este componente muestra un formulario de registro donde los usuarios pueden ingresar su información personal.
 * Valida que los campos obligatorios estén completos y que la contraseña cumpla con los requisitos mínimos de seguridad.
 */


@Component({
  selector: 'app-category-registro',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './category-registro.component.html',
  styleUrls: ['./category-registro.component.scss']
})
export class CategoryRegistroComponent {
  miFormulario!: FormGroup;
  formSubmitted: boolean = false;
  currentUser: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService
  ) {
    this.currentUser = this.userService.getCurrentUser();
  }

  logout() {
    this.userService.logout(); // Elimina el usuario autenticado
    this.currentUser = null;
  }

  ngOnInit(): void {
    this.miFormulario = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, this.validatePassword]],
      name: ['', Validators.required],
      rut: ['', Validators.required],
      direccion: ['', Validators.required],
      comuna: ['', Validators.required],
      rolId: [2, Validators.required]
    });
  }

   /**
   * Valida la fortaleza de una contraseña según los siguientes criterios:
   * - Debe contener al menos un número.
   * - Debe contener al menos un carácter especial.
   * - Debe contener al menos una letra.
   * - Debe tener una longitud entre 8 y 20 caracteres.
   *
   * @param control El control de formulario que representa el campo de contraseña.
   * @returns Un objeto de errores si la contraseña no cumple con los criterios especificados; de lo contrario, null.
   */
  validatePassword(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    const isValidLength = password && password.length >= 8 && password.length <= 20;

    const errors: ValidationErrors = {};
    if (!hasNumber) {
      errors['noNumber'] = true;
    }
    if (!hasSpecialCharacter) {
      errors['noSpecialCharacter'] = true;
    }
    if (!hasLetter) {
      errors['noLetter'] = true;
    }
    if (!isValidLength) {
      errors['invalidLength'] = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  submitForm() {
    this.formSubmitted = true;
    if (this.miFormulario.valid) {
      const newUser = {
        username: this.miFormulario.get('username')!.value,
        password: this.miFormulario.get('password')!.value,
        nombre: this.miFormulario.get('name')!.value,
        rut: this.miFormulario.get('rut')!.value,
        direccion: this.miFormulario.get('direccion')!.value,
        comuna: this.miFormulario.get('comuna')!.value,
        rolId: this.miFormulario.get('rolId')!.value
      };

      this.userService.addUser(newUser).subscribe(
        () => {
          window.alert('Usuario registrado exitosamente');
          this.router.navigate(['/index']);
        },
        error => {
          console.error('Error al registrar usuario:', error);
          // Maneja el error apropiadamente (mostrar mensaje al usuario, registrar en consola, etc.)
        }
      );
    }
  }
}
