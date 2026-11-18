import { Component,signal, computed, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
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
