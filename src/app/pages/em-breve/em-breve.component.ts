import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DashboardShellComponent } from '../../components/dashboard-shell/dashboard-shell.component';
import { AuthService } from '../../services/auth.service';
import { PERFIL_COR, PERFIL_LABEL } from '../../config/perfil';
import { INICIO_ROUTE_BY_ROLE } from '../../config/menu-items';

@Component({
  selector: 'app-em-breve',
  standalone: true,
  imports: [RouterLink, DashboardShellComponent],
  templateUrl: './em-breve.component.html',
  styleUrl: './em-breve.component.css',
})
export class EmBreveComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);

  get titulo(): string {
    return this.route.snapshot.data['titulo'] ?? 'Módulo';
  }

  get icon(): string {
    return this.route.snapshot.data['icon'] ?? 'bi-tools';
  }

  get perfilLabel(): string {
    const role = this.authService.getRole();
    return role ? PERFIL_LABEL[role] : '';
  }

  get corTema(): string {
    const role = this.authService.getRole();
    return role ? PERFIL_COR[role] : '#0057A8';
  }

  get inicioRoute(): string {
    const role = this.authService.getRole();
    return role ? INICIO_ROUTE_BY_ROLE[role] : '/login';
  }
}
