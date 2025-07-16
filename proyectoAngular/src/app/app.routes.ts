import { Routes } from '@angular/router';
import { HotelHabitaciones } from './pages/hotel-habitaciones/hotel-habitaciones';
import { HotelPagos } from './pages/hotel-pagos/hotel-pagos';
import { HotelReservas } from './pages/hotel-reservass/hotel-reservas';
import { HotelUsuarios } from './pages/hotel-usuarios/hotel-usuarios';
import { PaginaContactameComponent } from './pages/pagina-contactame/pagina-contactame';

export const routes: Routes = [
  { path: '', component: HotelUsuarios }, // Página principals
  { path: 'contactame', component: PaginaContactameComponent },
  { path: 'hotelhabitacion', component: HotelHabitaciones},
  { path: 'hotelpagos', component: HotelPagos},
  { path: 'hotelreservas', component: HotelReservas}
];
