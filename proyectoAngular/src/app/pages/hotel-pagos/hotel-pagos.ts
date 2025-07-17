import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagosService } from '../../services/pagos.service';

@Component({
  selector: 'app-hotel-pagos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hotel-pagos.html'
})
export class HotelPagos {
  pagos: any[] = [];
  pago = {
    id: null,
    id_reserva: null,
    monto: null,
    fecha_pago: ''
  };

  constructor(private pagoService: PagosService) {
    this.obtenerPagos();
  }

  obtenerPagos() {
    this.pagoService.obtenerPagos().subscribe((data: any) => {
      this.pagos = data;
    });
  }

  guardar() {
    if (!this.pago.id_reserva || !this.pago.monto || !this.pago.fecha_pago) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const datos = {
      id_reserva: this.pago.id_reserva,
      monto: Number(this.pago.monto),
      fecha_pago: this.pago.fecha_pago
    };

    if (this.pago.id) {
      this.pagoService.actualizarPago(this.pago.id, datos).subscribe(() => {
        this.obtenerPagos();
        this.pago = { id: null, id_reserva: null, monto: null, fecha_pago: '' };
      });
    } else {
      this.pagoService.agregarPago(datos).subscribe(() => {
        this.obtenerPagos();
        this.pago = { id: null, id_reserva: null, monto: null, fecha_pago: '' };
      });
    }
  }

  editar(p: any) {
    this.pago = { ...p };
  }

  cancelar() {
    this.pago = { id: null, id_reserva: null, monto: null, fecha_pago: '' };
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de eliminar este pago?')) {
      this.pagoService.eliminarPago(id).subscribe(() => {
        this.obtenerPagos();
      });
    }
  }
}
