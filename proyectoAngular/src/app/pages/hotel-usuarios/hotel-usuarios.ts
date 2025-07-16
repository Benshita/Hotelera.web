import { Component, OnInit } from '@angular/core';
import { ClienteService, Cliente } from '../services/cliente.service';

@Component({
  selector: 'app-hotel-usuarios',
  templateUrl: './hotel-usuarios.html',
  styleUrls: ['./hotel-usuarios.css'],
  standalone: true,
  imports: []
})
export class HotelUsuariosComponent implements OnInit {
  clientes: Cliente[] = [];
  nuevoCliente: Cliente = { nombre: '', correo: '', contrasena: '' };
  editandoId: number | null = null;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clienteService.getClientes().subscribe({
      next: (data) => this.clientes = data,
      error: () => alert('Error al cargar usuarios')
    });
  }

  guardarCliente() {
    if (this.editandoId) {
      this.clienteService.actualizarCliente(this.editandoId, this.nuevoCliente).subscribe(() => {
        this.resetFormulario();
        this.cargarClientes();
        alert('Usuario actualizado correctamente');
      });
    } else {
      this.clienteService.crearCliente(this.nuevoCliente).subscribe(() => {
        this.resetFormulario();
        this.cargarClientes();
        alert('Usuario creado correctamente');
      });
    }
  }

  editar(cliente: Cliente) {
    this.nuevoCliente = { ...cliente };
    this.editandoId = cliente.id!;
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      this.clienteService.eliminarCliente(id).subscribe(() => {
        this.cargarClientes();
        alert('Usuario eliminado');
      });
    }
  }

  resetFormulario() {
    this.nuevoCliente = { nombre: '', correo: '', contrasena: '' };
    this.editandoId = null;
  }
}
