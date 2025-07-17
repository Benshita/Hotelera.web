import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pago {
  id?: number;
  id_reserva: number;
  monto: number;
  fecha_pago: string;
}

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  private apiUrl = 'https://apiclases.inacode.cl/hotel/pagos';

  constructor(private http: HttpClient) {}

  obtenerPagos(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.apiUrl);
  }

  agregarPago(pago: Pago): Observable<any> {
    return this.http.post(this.apiUrl, pago);
  }

  actualizarPago(id: number, pago: Pago): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, pago);
  }

  eliminarPago(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
