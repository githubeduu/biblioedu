import { Routes } from '@angular/router';
import { CategoryBookComponent } from './components/category-book/category-book.component';
import { MantenedorProductosComponent } from './components/mantenedor-productos/mantenedor-productos.component';
import { IndexComponent } from './components/index/index.component';

export const routes: Routes = [
    { path: '', redirectTo: '/index', pathMatch: 'full' },
    { path: 'index', component: IndexComponent }, 
    { path: 'mantenedorProductos', component: MantenedorProductosComponent },
    { path: 'categoryBook', component: CategoryBookComponent }
];

