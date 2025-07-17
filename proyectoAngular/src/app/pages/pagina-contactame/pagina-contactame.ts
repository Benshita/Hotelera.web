import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/iniciosesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './pagina-contactame.html',
  styleUrl: './pagina-contactame.css',
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  correo: string = '';
  contrasena: string = '';
  mensajeError: string = '';

  constructor(private clienteService: ClienteService, private router: Router) {}

  iniciarSesion(): void {
    this.clienteService.loginCliente(this.correo, this.contrasena).subscribe({
      next: (usuario) => {
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this.router.navigate(['https://apiclases.inacode.cl/hotel/usuarios']); // cambia a la ruta que desees
      },
      error: () => {
        this.mensajeError = 'Correo o contraseña incorrectos';
      }
    });
  }
}
