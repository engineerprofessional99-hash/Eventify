import { Component, inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';

// @Component({
//   imports: [],
//   selector: 'app-admin-guard',
//   styleUrl: './admin-guard.css',
//   templateUrl: './admin-guard.html',
// })
export const AdminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(AuthService);

  if ((auth.isAdmin() as unknown as boolean)) {
    return true;
  }
  return router.createUrlTree(['/home'])
}
