import { Component, OnInit } from '@angular/core';
import { ClienteService, Cliente } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagina-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagina-clientes.html',
  styleUrl: './pagina-clientes.css'
})
export class PaginaClientes implements OnInit {
  clientes: Cliente[] = [];
  clienteNuevo: Cliente = { nombre: '',apellido: '', correo: '', telefono: '' };
  modoEdicion: boolean = false;
  idClienteEditando: number | null = null;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clienteService.obtenerClientes().subscribe({
      next: (data) => (this.clientes = data),
      error: (err) => console.error('Error al cargar clientes:', err)
    });
  }

  guardarCliente(): void {
  if (this.modoEdicion && this.idClienteEditando !== null) {
    this.clienteService.actualizarCliente(this.idClienteEditando, this.clienteNuevo).subscribe(() => {
      this.cargarClientes();       // Recarga
      this.resetFormulario();     // Limpia inputs
    });
  } else {
    this.clienteService.crearCliente(this.clienteNuevo).subscribe(() => {
      this.cargarClientes();
      this.resetFormulario();
    });
  }
}

  editarCliente(cliente: Cliente): void {
    this.modoEdicion = true;
    this.idClienteEditando = cliente.id_cliente ?? null;
    this.clienteNuevo = { ...cliente };
  }

  eliminarCliente(id: number): void {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      this.clienteService.eliminarCliente(id).subscribe(() => this.cargarClientes());
    }
  }

  resetFormulario(): void {
    this.modoEdicion = false;
    this.idClienteEditando = null;
    this.clienteNuevo = { nombre: '',apellido: '', correo: '', telefono: '' };
  }
}