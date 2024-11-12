import { Routes } from '@angular/router';
import { CategoryBookComponent } from './components/category-book/category-book.component';
import { MantenedorProductosComponent } from './components/mantenedor-productos/mantenedor-productos.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { CarroComponent } from './components/carro/carro.component';
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { CategoryRegistroComponent } from './components/category-registro/category-registro.component';

export const routes: Routes = [
    { path: '', redirectTo: '/index', pathMatch: 'full' },
    { path: 'index', component: IndexComponent }, 
    { path: 'mantenedorProductos', component: MantenedorProductosComponent },
    { path: 'categoryBook', component: CategoryBookComponent },
    { path: 'categoryRegistro', component: CategoryRegistroComponent },
    { path: 'login', component: LoginComponent },
    { path: 'carro', component: CarroComponent },
    { path: 'recuperarContrasena', component: RecuperarContrasenaComponent },
    { path: 'cuenta', component: CuentaComponent },
];

