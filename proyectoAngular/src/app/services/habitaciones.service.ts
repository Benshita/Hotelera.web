import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HabitacionesService {
  private api = 'https://apiclases.inacode.cl/hotel/habitaciones';

  constructor(private http: HttpClient) {}

  getHabitaciones(): Observable<any> {
    return this.http.get(this.api);
  }

  createHabitacion(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }

  updateHabitacion(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/${id}`, data);
  }

  deleteHabitacion(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
