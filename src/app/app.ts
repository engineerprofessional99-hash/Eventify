import { Component, inject, signal, computed } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth-service';

@Component({
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('eventify');
  menuOpen = signal(false);

  private authService = inject(AuthService);

  isLoggedIn = this.authService.isLoggedIn;

  currentUser = computed(() =>
    this.authService.currentUser()?.username ?? 'Guest'
  );

  navItems = [
    { label: 'Home', route: '/home' },
    { label: 'Events', route: '/events' },
    { label: 'About', route: '/about' },
    { label: 'Contact', route: '/contact' },
  ];

  constructor(private router: Router) {
    this.authService.loadSession();
  }

  logIn() {
    this.closeMenu();
    this.router.navigate(['/login']);
  }

  toggleMenu() {
    this.menuOpen.update(value => !value);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

  getStarted() {
    this.closeMenu();
    this.router.navigate(['/login']);
  }

  logOut() {
    this.closeMenu();
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
