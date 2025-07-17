import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, throwError } from 'rxjs';

export interface Cliente {
  id?: number;
  nombre: string;
  correo: string;
  contraseña: string | null;  // con tilde, y puede ser null
}


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = "https://apiclases.inacode.cl/hotel/usuarios";

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  crearCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  actualizarCliente(id: number, cliente: Cliente): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, cliente);
  }

  eliminarCliente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // 🔐 Aquí se hace el inicio de sesión usando la API real
loginCliente(correo: string, contrasena: string): Observable<Cliente> {
  return this.getClientes().pipe(
    map(clientes => {
      const encontrado = clientes.find(c =>
        c.correo.toLowerCase() === correo.toLowerCase() &&
        c.contraseña === contrasena
      );
      if (!encontrado) {
        throw new Error('Credenciales incorrectas');
      }
      return encontrado;
    })
  );
}
}
