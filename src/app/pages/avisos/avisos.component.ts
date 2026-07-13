import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardShellComponent } from '../../components/dashboard-shell/dashboard-shell.component';
import { AuthService } from '../../services/auth.service';
import { PERFIL_COR, PERFIL_LABEL } from '../../config/perfil';
import { UserRole } from '../types/user';
import { AVISOS, TIPO_AVISO_LABEL, TipoAviso } from '../../config/avisos';

type FiltroTipo = 'todos' | TipoAviso;

/**
 * Página "Avisos" — Direção, Aluno e Responsável.
 * Os avisos aqui cadastrados também aparecem no Calendário (fonte
 * compartilhada em config/avisos.ts). Para o perfil Aluno, o botão
 * "Novo Aviso" não é exibido, conforme especificação do PDF.
 */
@Component({
  selector: 'app-avisos',
  standalone: true,
  imports: [DashboardShellComponent, FormsModule],
  templateUrl: './avisos.component.html',
  styleUrl: './avisos.component.css',
})
export class AvisosComponent {
  private readonly authService = inject(AuthService);

  readonly tipoLabel = TIPO_AVISO_LABEL;

  readonly filtros: { valor: FiltroTipo; label: string }[] = [
    { valor: 'todos', label: 'Todos os tipos' },
    { valor: 'urgente', label: 'Urgente' },
    { valor: 'informativo', label: 'Informativo' },
    { valor: 'evento', label: 'Evento' },
    { valor: 'atencao', label: 'Atenção' },
  ];

  termoBusca = '';
  filtroAtivo: FiltroTipo = 'todos';

  private readonly avisos = [...AVISOS].sort((a, b) => b.data.getTime() - a.data.getTime());

  get avisoDestaque() {
    return this.avisos[0];
  }

  get avisosFiltrados() {
    return this.avisos.filter((a) => {
      const combinaFiltro = this.filtroAtivo === 'todos' || a.tipo === this.filtroAtivo;
      const combinaBusca = !this.termoBusca.trim() || a.titulo.toLowerCase().includes(this.termoBusca.trim().toLowerCase());
      return combinaFiltro && combinaBusca;
    });
  }

  dataLabel(data: Date): string {
    return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  classeTipo(tipo: TipoAviso): string {
    switch (tipo) {
      case 'urgente': return 'badge-pill urgente';
      case 'atencao': return 'badge-pill atencao';
      case 'evento': return 'badge-pill tipo-evento';
      case 'informativo': return 'badge-pill tipo-informativo';
    }
  }

  /** Para Aluno, a página é somente leitura — sem criação de avisos. */
  get exibirBotaoNovoAviso(): boolean {
    return this.authService.getRole() !== 'aluno';
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
