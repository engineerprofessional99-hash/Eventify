import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-about',
  styleUrl: './about.css',
  templateUrl: './about.html',
})
export class About {
  private router = inject(Router);
  exploreEvents() {
    this.router.navigate(['/events']);
  }
}
