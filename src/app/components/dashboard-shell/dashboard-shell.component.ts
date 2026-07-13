import { Component, HostListener, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { SidebarMenuComponent } from '../sidebar-menu/sidebar-menu.component';

/**
 * Cabeçalho (topbar) + menu lateral compartilhados por todos os dashboards de perfil.
 * Exibe marca, título da página, usuário logado e botão de sair.
 * O conteúdo específico de cada dashboard é projetado via <ng-content>.
 */
@Component({
  selector: 'app-dashboard-shell',
  imports: [SidebarMenuComponent],
  templateUrl: './dashboard-shell.component.html',
  styleUrl: './dashboard-shell.component.css'
})
export class DashboardShellComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly platformId = inject(PLATFORM_ID);

  /** Título principal exibido no topo da página (ex: "Painel do Professor"). */
  @Input() tituloPagina = '';
  /** Linha de contexto abaixo do título (ex: escola vinculada). */
  @Input() subtitulo = '';
  /** Rótulo do perfil exibido como badge ao lado do nome do usuário. */
  @Input() perfilLabel = '';
  /** Cor de destaque do badge de perfil (segue a paleta institucional). */
  @Input() corTema = '#0057A8';

  /** Menu lateral recolhido (somente ícones). Começa recolhido em telas de tablet. */
  sidebarCollapsed = false;
  /** Menu lateral aberto como gaveta (mobile). */
  sidebarMobileOpen = false;

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.sidebarCollapsed = window.innerWidth <= 1024;
    }
  }

  get nome(): string {
    return this.authService.getNome() ?? 'Usuário';
  }

  toggleSidebar(): void {
    if (!this.isBrowser) return;

    if (window.innerWidth <= 768) {
      this.sidebarMobileOpen = !this.sidebarMobileOpen;
    } else {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    }
  }

  fecharSidebarMobile(): void {
    this.sidebarMobileOpen = false;
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser && window.innerWidth > 768) {
      this.sidebarMobileOpen = false;
    }
  }

  sair(): void {
    this.authService.logout();
  }
}
