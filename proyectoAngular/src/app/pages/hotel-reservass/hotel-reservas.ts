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
    if (this.editando && this.idEditando !== null) {
      this.reservaService.updateReserva(this.idEditando, this.reserva).subscribe(() => {
        this.resetear();
        this.obtenerReservas();
      });
    } else {
      this.reservaService.createReserva(this.reserva).subscribe(() => {
        this.resetear();
        this.obtenerReservas();
      });
    }
  }

  editar(reserva: any) {
    this.reserva = { ...reserva };
    this.idEditando = reserva.id;
    this.editando = true;
  }

  eliminar(id: number) {
    this.reservaService.deleteReserva(id).subscribe(() => {
      this.obtenerReservas();
    });
  }

  resetear() {
    this.reserva = { id_usuario: 0, id_habitacion: 0, fecha_inicio: '', fecha_fin: '' };
    this.editando = false;
    this.idEditando = null;
  }
}
