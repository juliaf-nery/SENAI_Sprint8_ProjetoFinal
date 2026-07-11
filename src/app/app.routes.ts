import { Routes } from '@angular/router';
import { homeGuard } from './guards/home.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/inicio/inicio.component').then((c) => c.InicioComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
  },

  {
    path: 'home-admin',
    loadComponent: () =>
      import('./pages/home-admin/home-admin.component').then(
        (c) => c.HomeAdminComponent
      ),
    canActivate: [homeGuard],
    data: { roles: ['administrador'] },
  },
  {
    path: 'home-direcao',
    loadComponent: () =>
      import('./pages/home-direcao/home-direcao.component').then(
        (c) => c.HomeDirecaoComponent
      ),
    canActivate: [homeGuard],
    data: { roles: ['direcao'] },
  },
  {
    path: 'home-professor',
    loadComponent: () =>
      import('./pages/home-professor/home-professor.component').then(
        (c) => c.HomeProfessorComponent
      ),
    canActivate: [homeGuard],
    data: { roles: ['professor'] },
  },
  {
    path: 'home-aluno',
    loadComponent: () =>
      import('./pages/home-aluno/home-aluno.component').then(
        (c) => c.HomeAlunoComponent
      ),
    canActivate: [homeGuard],
    data: { roles: ['aluno'] },
  },
  {
    path: 'home-responsavel',
    loadComponent: () =>
      import('./pages/home-responsavel/home-responsavel.component').then(
        (c) => c.HomeResponsavelComponent
      ),
    canActivate: [homeGuard],
    data: { roles: ['responsavel'] },
  },
];
