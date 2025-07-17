import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagosService } from '../../services/pagos.service';

@Component({
  selector: 'app-hotel-pagos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hotel-pagos.html',
  styleUrls: ['./hotel-pagos.css']
})
export class HotelPagos implements OnInit {
  pagos: any[] = [];
  pagoNuevo = {
    id: null,
    id_reserva: null,
    monto: null,
    fecha_pago: ''
  };

  modoEdicion: boolean = false;
  idPagoEditando: number | null = null;

  constructor(private pagoService: PagosService) {}

  ngOnInit(): void {
    this.obtenerPagos();
  }

  obtenerPagos(): void {
    this.pagoService.obtenerPagos().subscribe({
      next: (data) => this.pagos = data,
      error: (err) => console.error('Error al obtener pagos:', err)
    });
  }

  guardarPago(): void {
    if (!this.pagoNuevo.id_reserva || !this.pagoNuevo.monto || !this.pagoNuevo.fecha_pago) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const datos = {
      id_reserva: this.pagoNuevo.id_reserva,
      monto: Number(this.pagoNuevo.monto),
      fecha_pago: this.pagoNuevo.fecha_pago
    };

    if (this.modoEdicion && this.idPagoEditando !== null) {
      this.pagoService.actualizarPago(this.idPagoEditando, datos).subscribe(() => {
        this.obtenerPagos();
        this.resetFormulario();
      });
    } else {
      this.pagoService.agregarPago(datos).subscribe(() => {
        this.obtenerPagos();
        this.resetFormulario();
      });
    }
  }

  editarPago(pago: any): void {
    this.modoEdicion = true;
    this.idPagoEditando = pago.id ?? null;
    this.pagoNuevo = { ...pago };
  }

  eliminarPago(id: number): void {
    if (confirm('¿Estás seguro de eliminar este pago?')) {
      this.pagoService.eliminarPago(id).subscribe(() => {
        this.obtenerPagos();
      });
    }
  }

  resetFormulario(): void {
    this.modoEdicion = false;
    this.idPagoEditando = null;
    this.pagoNuevo = {
      id: null,
      id_reserva: null,
      monto: null,
      fecha_pago: ''
    };
  }
}
