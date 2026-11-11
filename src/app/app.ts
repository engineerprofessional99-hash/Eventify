import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('eventify');
  menuOpen = signal(false);
  currentUser = signal("Guest");
  isLoggedIn = signal(false);

  navItems = [
    {label: 'Home', route: '/home'},
    {label: 'Events', route: '/events'},
    {label: 'About', route: '/about'},
    {label: 'Contact', route: '/contact'},
    // {label: 'Login', route: '/login'},
  ];
  constructor(private router: Router){}
  logIn(){
    this.closeMenu();
    this.router.navigate(['/login']);
  }

  toggleMenu(){
    this.menuOpen.update(value=>!value);
  }
  closeMenu(){
    this.menuOpen.set(false);
  }
  getStarted(){
    this.closeMenu();
    this.router.navigate(['/registeration']);
  }

  logOut(){
    this.isLoggedIn.set(false);
    this.closeMenu();
    this.router.navigate(['/login']);
    this.currentUser.set('Guest');
  }
}
