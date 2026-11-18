import { Component, inject, signal, computed } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth-service';
import { Navbar } from './pages/layout/navbar/navbar';
import { Footer } from './pages/layout/footer/footer';

@Component({
  imports: [RouterOutlet, Navbar, Footer],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('eventify');

}
