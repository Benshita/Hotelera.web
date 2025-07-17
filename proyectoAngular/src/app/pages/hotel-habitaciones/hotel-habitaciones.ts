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
    const mensaje = this.editando
      ? '¿Confirmas que deseas actualizar esta habitación?'
      : '¿Deseas registrar esta nueva habitación?';

    if (!this.habitacion.numero || !this.habitacion.tipo || !this.habitacion.precio) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (confirm(mensaje)) {
      if (this.editando && this.idEditando !== null) {
        this.habitacionService.updateHabitacion(this.idEditando, this.habitacion).subscribe(() => {
          alert('Habitación actualizada con éxito');
          window.location.reload(); // 👈 Recarga la página
        });
      } else {
        this.habitacionService.createHabitacion(this.habitacion).subscribe(() => {
          alert('Habitación registrada con éxito');
          window.location.reload(); // 👈 Recarga la página
        });
      }
    }
  }

  editar(habitacion: any) {
    this.habitacion = { ...habitacion };
    this.idEditando = habitacion.id;
    this.editando = true;
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta habitación? Esta acción no se puede deshacer.')) {
      this.habitacionService.deleteHabitacion(id).subscribe(() => {
        alert('Habitación eliminada con éxito');
        window.location.reload(); // 👈 Recarga la página
      });
    }
  }

  resetear() {
    this.habitacion = { numero: '', tipo: '', precio: 0 };
    this.editando = false;
    this.idEditando = null;
  }
}
