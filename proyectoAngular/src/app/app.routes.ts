import { Routes } from '@angular/router';
import { HotelHabitaciones } from './pages/hotel-habitaciones/hotel-habitaciones';
import { HotelPagos } from './pages/hotel-pagos/hotel-pagos';
import { HotelReservas } from './pages/hotel-reservass/hotel-reservas';
import { HotelUsuarios } from './pages/hotel-usuarios/hotel-usuarios';
import { Login } from './pages/pagina-contactame/pagina-contactame';
import { HotelHome } from './pages/home/hotel-home';

export const routes: Routes = [
  { path: '', component: HotelHome },
  { path: 'cliente', component: HotelUsuarios },
  { path: 'contactame', component: Login },
  { path: 'hotelhabitacion', component: HotelHabitaciones},
  { path: 'hotelpagos', component: HotelPagos},
  { path: 'hotelreservas', component: HotelReservas},
  { path: 'hotelusuarios', component: HotelUsuarios },

];
