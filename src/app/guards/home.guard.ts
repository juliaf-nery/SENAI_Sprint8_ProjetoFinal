import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../pages/types/user';

/**
 * Guard aplicado às rotas de Home por perfil.
 * 1) Bloqueia acesso se não houver sessão (token) válida.
 * 2) Se a rota declarar `data: { roles: [...] }`, garante que o perfil do
 *    usuário logado bate com o perfil esperado pela rota; caso contrário,
 *    redireciona automaticamente para a Home correta do usuário.
 */
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
