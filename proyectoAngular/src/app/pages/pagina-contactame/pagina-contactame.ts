import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // <- Importar módulo

@Component({
  selector: 'app-pagina-contactame',
  standalone: true,
  templateUrl: './pagina-contactame.html',
  styleUrls: ['./pagina-contactame.css'],
  imports: [CommonModule, FormsModule, HttpClientModule] // <- Agregar HttpClientModule aquí
})
export class PaginaContactameComponent {
  nombre = '';
  correo = '';
  mensaje = '';

  constructor(private http: HttpClient) {}

  enviarCorreo() {
    const datos = {
      nombre: this.nombre,
      correo: this.correo,
      mensaje: this.mensaje
    };

    const token = 'JV8SS2zdS02I5gr1dy5Fd4HGSIOY6HHEAO0SuVOLu54dLnUvNu'; // Tu token

    const headers = {
      'Authorization': `Bearer ${token}`
    };

    this.http.post('http://localhost:3000/enviarCorreo', datos, { headers }).subscribe({
      next: () => {
        alert('✅ Consulta enviada con éxito');
        this.nombre = '';
        this.correo = '';
        this.mensaje = '';
      },
      error: err => {
        console.error('❌ Error al enviar desde Angular:', err);
        alert('❌ Error al enviar el correo: ' + err.error?.error || err.message);
      }
    });
  }
}