import { Routes } from '@angular/router';
import { HotelHabitaciones } from './pages/hotel-habitaciones/hotel-habitaciones';
import { HotelPagos } from './pages/hotel-pagos/hotel-pagos';
import { HotelReservas } from './pages/hotel-reservass/hotel-reservas';
import { HotelUsuariosComponent } from './pages/hotel-usuarios/hotel-usuarios';
import { PaginaContactameComponent } from './pages/pagina-contactame/pagina-contactame';
import { Home } from './pages/home/hotel-home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'cliente', component: HotelUsuariosComponent },
  { path: 'contactame', component: PaginaContactameComponent },
  { path: 'hotelhabitacion', component: HotelHabitaciones},
  { path: 'hotelpagos', component: HotelPagos},
  { path: 'hotelreservas', component: HotelReservas},
  { path: 'hotelusuarios', component: HotelUsuariosComponent },
];
