import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PagosService {
  private url = 'https://apiclases.inacode.cl/hotel/pagos';

  constructor(private http: HttpClient) {}

  obtenerPagos() {
    return this.http.get(this.url);
  }

  agregarPago(pago: any) {
    return this.http.post(this.url, pago);
  }

  actualizarPago(id: number, pago: any) {
    return this.http.put(`${this.url}/${id}`, pago);
  }

  eliminarPago(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
