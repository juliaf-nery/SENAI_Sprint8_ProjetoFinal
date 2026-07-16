import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardShellComponent } from '../../components/dashboard-shell/dashboard-shell.component';
import { AuthService } from '../../services/auth.service';
import { PERFIL_COR, PERFIL_LABEL } from '../../config/perfil';
import { UserRole } from '../types/user';
import { ThemeService } from '../../services/theme.service';

interface ConfiguracoesEstado {
  notifNavegador: boolean;
  notifEmail: boolean;
  notifSms: boolean;
  somNotificacao: boolean;
  temaEscuro: boolean;
  idioma: string;
  reduzirMovimento: boolean;
  altoContraste: boolean;
}

/**
 * Página "Configurações".
 * Segue o modelo do PDF, sem o card de "Privacidade" (removido conforme
 * especificação). Regras de negócio implementadas:
 * - Pelo menos uma forma de notificação precisa ficar ativa: ao tentar
 *   salvar sem nenhuma ativa, exibe o alerta "Ao menos uma das
 *   notificações deve estar ativada" e a alteração não é salva.
 * - O "Tema escuro" pode ser alternado livremente na tela, mas só é
 *   efetivado em todo o painel quando o usuário clica em
 *   "Salvar Configurações" (via ThemeService).
 */
@Component({
  selector: 'app-configuracoes',
  standalone: true,
  imports: [DashboardShellComponent, FormsModule],
  templateUrl: './configuracoes.component.html',
  styleUrl: './configuracoes.component.css',
})
export class ConfiguracoesComponent {
  private readonly authService = inject(AuthService);
  private readonly themeService = inject(ThemeService);

  private readonly configSalva: ConfiguracoesEstado = {
    notifNavegador: true,
    notifEmail: true,
    notifSms: false,
    somNotificacao: true,
    temaEscuro: this.themeService.temaEscuroAtivo,
    idioma: 'pt-BR',
    reduzirMovimento: false,
    altoContraste: false,
  };

  /** Estado em edição na tela — só é persistido/efetivado ao salvar. */
  config: ConfiguracoesEstado = { ...this.configSalva };

  erroNotificacoes = false;
  mensagemSalvo = false;

  get nenhumaNotificacaoAtiva(): boolean {
    return !this.config.notifNavegador && !this.config.notifEmail && !this.config.notifSms && !this.config.somNotificacao;
  }

  salvarConfiguracoes(): void {
    if (this.nenhumaNotificacaoAtiva) {
      this.erroNotificacoes = true;
      this.mensagemSalvo = false;
      return;
    }

    this.erroNotificacoes = false;
    Object.assign(this.configSalva, this.config);

    // Só agora o tema escuro é efetivado em todo o painel do aluno.
    this.themeService.aplicarTema(this.config.temaEscuro);

    this.mensagemSalvo = true;
    setTimeout(() => (this.mensagemSalvo = false), 4000);
  }

  cancelar(): void {
    this.config = { ...this.configSalva };
    this.erroNotificacoes = false;
    this.mensagemSalvo = false;
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
