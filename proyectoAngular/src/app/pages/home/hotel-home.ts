import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HotelHomeService, Cliente } from '../../services/hotel-home.service'; 

@Component({
  selector: 'app-hotel-home',
  standalone: true,
  templateUrl: './hotel-home.html',
  styleUrls: ['./hotel-home.css'],
  imports: [CommonModule, FormsModule]
})
export class HotelHomeComponent implements OnInit {
  clientes: Cliente[] = [];
  nuevoCliente: Cliente = { nombre: '', correo: '', contraseña: null };
  editandoId: number | null = null;

  correo: string = '';
  contraseña: string = '';

  usuarioLogueado: Cliente | null = null;

  constructor(private hotelHomeService: HotelHomeService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.hotelHomeService.getClientes().subscribe({
      next: (data) => (this.clientes = data),
      error: () => alert('Error al cargar usuarios')
    });
  }

  guardarCliente(): void {
    if (this.editandoId) {
      this.hotelHomeService.actualizarCliente(this.editandoId, this.nuevoCliente).subscribe(() => {
        this.cargarClientes();
        this.resetFormulario();
        alert('Usuario actualizado');
      });
    } else {
      this.hotelHomeService.crearCliente(this.nuevoCliente).subscribe(() => {
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
      this.hotelHomeService.eliminarCliente(id).subscribe(() => {
        this.cargarClientes();
        alert('Usuario eliminado');
      });
    }
  }

  resetFormulario(): void {
    this.nuevoCliente = { nombre: '', correo: '', contraseña: null };
    this.editandoId = null;
  }

  // Método para iniciar sesión usando el servicio
  iniciarSesion(): void {
    this.hotelHomeService.loginCliente(this.correo, this.contraseña).subscribe({
      next: (usuario) => {
        this.usuarioLogueado = usuario;
        alert(`Bienvenido, ${usuario.nombre}!`);
        this.correo = '';
        this.contraseña = '';
      },
      error: (err) => {
        alert(err.message || 'Error al iniciar sesión');
      }
    });
  }
}
