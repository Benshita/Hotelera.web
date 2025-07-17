import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './hotel-home.html',
  styleUrls: ['./hotel-home.css']
})
export class Home {}

