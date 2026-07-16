import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginResponse, UserRole } from '../pages/types/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly API_URL = environment.apiUrl;

  private readonly ROLE_HOME_ROUTES: Record<UserRole, string> = {
    administrador: '/home-admin',
    direcao: '/home-direcao',
    professor: '/home-professor',
    aluno: '/home-aluno',
    responsavel: '/home-responsavel',
  };

  login(identifier: string, senha: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.API_URL}/login`, { identifier, senha })
      .pipe(tap((response) => this.persistSession(response)));
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('nome');
    sessionStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  getRole(): UserRole | null {
    return sessionStorage.getItem('role') as UserRole | null;
  }

  getNome(): string | null {
    return sessionStorage.getItem('nome');
  }

  redirectToHomeByRole(role: UserRole): void {
    const rota = this.ROLE_HOME_ROUTES[role];

    if (!rota) {
      console.error(`Perfil desconhecido: "${role}". Redirecionando para o login.`);
      this.router.navigate(['/login']);
      return;
    }

    this.router.navigate([rota]);
  }

  private persistSession(response: LoginResponse): void {
    sessionStorage.setItem('token', response.token);
    sessionStorage.setItem('nome', response.user.nome);
    sessionStorage.setItem('role', response.user.role);
  }
}
