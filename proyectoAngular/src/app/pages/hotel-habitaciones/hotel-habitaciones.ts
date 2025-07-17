import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HabitacionesService } from '../../services/habitaciones.service';

@Component({
  selector: 'app-hotel-habitaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hotel-habitaciones.html',
  styleUrls: ['./hotel-habitaciones.css']
})
export class HotelHabitaciones {
  habitaciones: any[] = [];
  habitacion = {
    numero: '',
    tipo: '',
    precio: 0
  };
  editando = false;
  idEditando: number | null = null;

  constructor(private habitacionService: HabitacionesService) {
    this.obtenerHabitaciones();
  }

  obtenerHabitaciones() {
    this.habitacionService.getHabitaciones().subscribe(data => {
      this.habitaciones = data;
    });
  }

  guardar() {
    if (this.editando && this.idEditando !== null) {
      this.habitacionService.updateHabitacion(this.idEditando, this.habitacion).subscribe(() => {
        this.resetear();
        this.obtenerHabitaciones();
      });
    } else {
      this.habitacionService.createHabitacion(this.habitacion).subscribe(() => {
        this.resetear();
        this.obtenerHabitaciones();
      });
    }
  }

  editar(habitacion: any) {
    this.habitacion = { ...habitacion };
    this.idEditando = habitacion.id;
    this.editando = true;
  }

  eliminar(id: number) {
    this.habitacionService.deleteHabitacion(id).subscribe(() => {
      this.obtenerHabitaciones();
    });
  }

  resetear() {
    this.habitacion = { numero: '', tipo: '', precio: 0 };
    this.editando = false;
    this.idEditando = null;
  }
}
