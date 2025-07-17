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

  confirmarGuardarPago(): void {
    const mensaje = this.modoEdicion
      ? '¿Confirmas que deseas actualizar este pago?'
      : '¿Deseas registrar este nuevo pago?';

    if (confirm(mensaje)) {
      this.guardarPago();
    }
  }

  confirmarEliminarPago(id: number): void {
    const confirmar = confirm('¿Estás seguro de que deseas eliminar este pago? Esta acción no se puede deshacer.');
    if (confirmar) {
      this.eliminarPago(id);
    }
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
        alert('Pago actualizado con éxito');
        window.location.reload(); // 👈 Recarga total
      });
    } else {
      this.pagoService.agregarPago(datos).subscribe(() => {
        alert('Pago registrado con éxito');
        window.location.reload(); // 👈 Recarga total
      });
    }
  }

  eliminarPago(id: number): void {
    this.pagoService.eliminarPago(id).subscribe(() => {
      alert('Pago eliminado con éxito');
      window.location.reload(); // 👈 Recarga total
    });
  }

  editarPago(pago: any): void {
    this.modoEdicion = true;
    this.idPagoEditando = pago.id ?? null;
    this.pagoNuevo = { ...pago };
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
