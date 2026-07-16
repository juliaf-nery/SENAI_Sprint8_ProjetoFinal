import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  INICIO_ROUTE_BY_ROLE,
  MENU_ITEMS_BY_ROLE,
  MENU_ITEMS_COMUNS,
  MenuItem,
} from '../../config/menu-items';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.css',
})
export class SidebarMenuComponent {
  private readonly authService = inject(AuthService);

  @Input() collapsed = false;
  @Input() mobileOpen = false;
  @Output() linkClicked = new EventEmitter<void>();

  get inicioRoute(): string {
    const role = this.authService.getRole();
    return role ? INICIO_ROUTE_BY_ROLE[role] : '/login';
  }

  get itensPerfil(): MenuItem[] {
    const role = this.authService.getRole();
    return role ? MENU_ITEMS_BY_ROLE[role] : [];
  }

  /** Itens comuns (Meu Perfil, Configurações), sem duplicar o que já existe nos itens do perfil. */
  get itensComuns(): MenuItem[] {
    const rotasDoPerfil = new Set(this.itensPerfil.map((item) => item.route));
    return MENU_ITEMS_COMUNS.filter((item) => !rotasDoPerfil.has(item.route));
  }

  onLinkClick(): void {
    this.linkClicked.emit();
  }

  sair(): void {
    this.authService.logout();
  }
}
