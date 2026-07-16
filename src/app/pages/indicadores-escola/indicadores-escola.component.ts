import { Component, inject } from '@angular/core';
import { DashboardShellComponent } from '../../components/dashboard-shell/dashboard-shell.component';
import { AuthService } from '../../services/auth.service';
import { PERFIL_COR, PERFIL_LABEL } from '../../config/perfil';
import { UserRole } from '../types/user';

@Component({
  selector: 'app-indicadores-escola',
  standalone: true,
  imports: [DashboardShellComponent],
  templateUrl: './indicadores-escola.component.html',
  styleUrl: './indicadores-escola.component.css'
})
export class IndicadoresEscolaComponent {
  private readonly authService = inject(AuthService);

  get ehProfessor(): boolean {
    return this.authService.getRole() === 'professor';
  }

  get perfilLabel(): string {
    const role = this.authService.getRole();
    return role ? PERFIL_LABEL[role as UserRole] : 'Usuário';
  }

  get corTema(): string {
    const role = this.authService.getRole();
    return role ? PERFIL_COR[role as UserRole] : '#0057A8';
  }
}
