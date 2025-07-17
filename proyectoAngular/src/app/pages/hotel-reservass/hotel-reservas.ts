import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservasService } from '../../services/reservass.service';

@Component({
  selector: 'app-hotel-reservas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hotel-reservas.html',
  styleUrls: ['./hotel-reservas.css']
})
export class HotelReservas {
  reservas: any[] = [];
  reserva = {
    id_usuario: 0,
    id_habitacion: 0,
    fecha_inicio: '',
    fecha_fin: ''
  };
  editando = false;
  idEditando: number | null = null;

  constructor(private reservaService: ReservasService) {
    this.obtenerReservas();
  }

  obtenerReservas() {
    this.reservaService.getReservas().subscribe(data => {
      this.reservas = data;
    });
  }

  guardar() {
    if (!this.reserva.id_usuario || !this.reserva.id_habitacion || !this.reserva.fecha_inicio || !this.reserva.fecha_fin) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const mensaje = this.editando
      ? '¿Confirmas que deseas actualizar esta reserva?'
      : '¿Deseas crear esta nueva reserva?';

    if (confirm(mensaje)) {
      if (this.editando && this.idEditando !== null) {
        this.reservaService.updateReserva(this.idEditando, this.reserva).subscribe(() => {
          alert('Reserva actualizada con éxito');
          window.location.reload();  // recarga la página
        });
      } else {
        this.reservaService.createReserva(this.reserva).subscribe(() => {
          alert('Reserva creada con éxito');
          window.location.reload();  // recarga la página
        });
      }
    }
  }

  editar(reserva: any) {
    this.reserva = { ...reserva };
    this.idEditando = reserva.id;
    this.editando = true;
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de eliminar esta reserva? Esta acción no se puede deshacer.')) {
      this.reservaService.deleteReserva(id).subscribe(() => {
        alert('Reserva eliminada con éxito');
        window.location.reload(); // recarga la página
      });
    }
  }

  resetear() {
    this.reserva = { id_usuario: 0, id_habitacion: 0, fecha_inicio: '', fecha_fin: '' };
    this.editando = false;
    this.idEditando = null;
  }
}
