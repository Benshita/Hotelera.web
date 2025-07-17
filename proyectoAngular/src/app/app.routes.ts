import { Routes } from '@angular/router';
import { HotelHabitaciones } from './pages/hotel-habitaciones/hotel-habitaciones';
import { HotelPagos } from './pages/hotel-pagos/hotel-pagos';
import { HotelReservas } from './pages/hotel-reservass/hotel-reservas';
import { HotelUsuariosComponent } from './pages/hotel-usuarios/hotel-usuarios';
import { HotelHomeService } from './services/hotel-home.service';
import { LoginComponent } from './pages/pagina-contactame/pagina-contactame';

export const routes: Routes = [
  { path: '', component: HotelHomeService },
  { path: 'cliente', component: HotelUsuariosComponent },
  { path: 'contactame', component: LoginComponent },
  { path: 'hotelhabitacion', component: HotelHabitaciones},
  { path: 'hotelpagos', component: HotelPagos},
  { path: 'hotelreservas', component: HotelReservas},
  { path: 'hotelusuarios', component: HotelUsuariosComponent },
];
