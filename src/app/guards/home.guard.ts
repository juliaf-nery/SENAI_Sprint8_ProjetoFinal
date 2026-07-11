import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../pages/types/user';

export const homeGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const authService = inject(AuthService);

  if (!isPlatformBrowser(platformId)) {
    return false;
  }

  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  const allowedRoles = route.data['roles'] as UserRole[] | undefined;
  const userRole = authService.getRole();

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    authService.redirectToHomeByRole(userRole);
    return false;
  }

  return true;
};
