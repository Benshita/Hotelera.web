import { Component, OnInit } from '@angular/core';
import { ClienteService, Cliente } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hotel-usuarios',
  standalone: true,
  templateUrl: './hotel-usuarios.html',
  styleUrls: ['./hotel-usuarios.css'],  // corregí "styleUrl" a "styleUrls"
  imports: [CommonModule, FormsModule]
})
export class HotelUsuariosComponent implements OnInit {
  clientes: Cliente[] = [];
  nuevoCliente: Cliente = { nombre: '', correo: '', contrasena: '' };
  editandoId: number | null = null;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (data) => (this.clientes = data),
      error: () => alert('Error al cargar usuarios')
    });
  }

  guardarCliente(): void {
    if (this.editandoId) {
      if (confirm('¿Confirmas actualizar este usuario?')) {
        this.clienteService.actualizarCliente(this.editandoId, this.nuevoCliente).subscribe(() => {
          alert('Usuario actualizado');
          window.location.reload(); // Recarga la página completa
        });
      }
    } else {
      if (confirm('¿Confirmas crear este usuario?')) {
        this.clienteService.crearCliente(this.nuevoCliente).subscribe(() => {
          alert('Usuario creado');
          window.location.reload(); // Recarga la página completa
        });
      }
    }
  }

  editar(cliente: Cliente): void {
    this.nuevoCliente = { ...cliente };
    this.editandoId = cliente.id!;
  }

  eliminar(id: number): void {
    if (confirm('¿Deseas eliminar este usuario?')) {
      this.clienteService.eliminarCliente(id).subscribe(() => {
        alert('Usuario eliminado');
        window.location.reload(); // Recarga la página completa
      });
    }
  }

  resetFormulario(): void {
    this.nuevoCliente = { nombre: '', correo: '', contrasena: '' };
    this.editandoId = null;
  }
}
