import { Routes } from '@angular/router';
import { PaginaClientes } from './pages/pagina-clientes/pagina-clientes';
import { PaginaProductos } from './pages/pagina-productos/pagina-productos';
import { PaginaContactameComponent } from './pages/pagina-contactame/pagina-contactame';

export const routes: Routes = [
  { path: '', component: PaginaClientes }, // Página principal
  { path: 'productos', component: PaginaProductos },
  { path: 'contactame', component: PaginaContactameComponent }
];
