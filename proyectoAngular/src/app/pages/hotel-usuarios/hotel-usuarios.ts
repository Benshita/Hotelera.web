import { Component, OnInit } from '@angular/core';
import { HotelUsuariosService } from './hotel-usuarios.service';

@Component({
  selector: 'app-hotel-usuarios',
  templateUrl: './hotel-usuarios.html',
  styleUrls: ['./hotel-usuarios.css']
})
export class HotelUsuariosComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private usuariosService: HotelUsuariosService) {}

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuariosService.getUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  eliminarUsuario(id: number) {
    if (confirm('¿Seguro que quieres eliminar este usuario?')) {
      this.usuariosService.deleteUsuario(id).subscribe(() => {
        alert('Usuario eliminado');
        this.getUsuarios();
      });
    }
  }
}