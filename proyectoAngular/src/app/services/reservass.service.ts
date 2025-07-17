import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReservasService {
  private api = 'https://apiclases.inacode.cl/hotel/reservas';

  constructor(private http: HttpClient) {}

  getReservas(): Observable<any> {
    return this.http.get(this.api);
  }

  createReserva(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }

  updateReserva(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/${id}`, data);
  }

  deleteReserva(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
