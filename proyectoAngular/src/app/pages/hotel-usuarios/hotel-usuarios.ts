import { Component, OnInit } from '@angular/core';
import { ClienteService, Cliente } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hotel-usuarios',
  standalone: true,
  templateUrl: './hotel-usuarios.html',
  styleUrl: './hotel-usuarios.css',
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
      this.clienteService.actualizarCliente(this.editandoId, this.nuevoCliente).subscribe(() => {
        this.cargarClientes();
        this.resetFormulario();
        alert('Usuario actualizado');
      });
    } else {
      this.clienteService.crearCliente(this.nuevoCliente).subscribe(() => {
        this.cargarClientes();
        this.resetFormulario();
        alert('Usuario creado');
      });
    }
  }

  editar(cliente: Cliente): void {
    this.nuevoCliente = { ...cliente };
    this.editandoId = cliente.id!;
  }

  eliminar(id: number): void {
    if (confirm('¿Deseas eliminar este usuario?')) {
      this.clienteService.eliminarCliente(id).subscribe(() => {
        this.cargarClientes();
        alert('Usuario eliminado');
      });
    }
  }

  resetFormulario(): void {
    this.nuevoCliente = { nombre: '', correo: '', contrasena: '' };
    this.editandoId = null;
  }
}