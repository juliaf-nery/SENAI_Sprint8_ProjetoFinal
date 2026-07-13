import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardShellComponent } from '../../components/dashboard-shell/dashboard-shell.component';
import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card.component';
import { AuthService } from '../../services/auth.service';
import { PERFIL_COR, PERFIL_LABEL } from '../../config/perfil';
import { UserRole } from '../types/user';

/**
 * Status possíveis de uma atividade.
 * "enviada" é o novo tipo pedido no PDF, usado para classificar as
 * atividades que o aluno já entregou e que aguardam correção.
 */
type StatusAtividade = 'aberta' | 'agendada' | 'enviada' | 'paraCorrigir' | 'corrigida';

interface Atividade {
  titulo: string;
  descricao: string;
  disciplina: string;
  turma: string;
  data: string;
  status: StatusAtividade;
  progresso?: number; // 0-100, exibido como barra (ex: entregas da turma)
  nota?: number;
}

const STATUS_LABEL: Record<StatusAtividade, string> = {
  aberta: 'Aberta',
  agendada: 'Agendada',
  enviada: 'Enviada',
  paraCorrigir: 'Para Corrigir',
  corrigida: 'Corrigida',
};

const STATUS_CLASSE: Record<StatusAtividade, string> = {
  aberta: 'status-aberta',
  agendada: 'status-agendada',
  enviada: 'status-enviada',
  paraCorrigir: 'status-corrigir',
  corrigida: 'status-corrigida',
};

type FiltroAtividade = 'todos' | StatusAtividade;

/**
 * Página "Atividades" — Professor e Aluno.
 * Segue o modelo do PDF, com a adição do tipo "Enviadas" para classificar
 * as atividades que o aluno já entregou e aguardam correção do professor.
 */
@Component({
  selector: 'app-atividades',
  standalone: true,
  imports: [DashboardShellComponent, DashboardCardComponent, FormsModule],
  templateUrl: './atividades.component.html',
  styleUrl: './atividades.component.css',
})
export class AtividadesComponent {
  private readonly authService = inject(AuthService);

  readonly statusLabel = STATUS_LABEL;
  readonly statusClasse = STATUS_CLASSE;

  termoBusca = '';
  filtroAtivo: FiltroAtividade = 'todos';

  readonly filtros: { valor: FiltroAtividade; label: string }[] = [
    { valor: 'todos', label: 'Todos' },
    { valor: 'aberta', label: 'Abertas' },
    { valor: 'agendada', label: 'Agendadas' },
    { valor: 'enviada', label: 'Enviadas' },
    { valor: 'paraCorrigir', label: 'Para Corrigir' },
  ];

  readonly atividades: Atividade[] = [
    {
      titulo: 'Lista de Exercícios — Funções do 2º Grau',
      descricao: 'Resolver exercícios 1 a 15 da apostila, página 42.',
      disciplina: 'Matemática',
      turma: '3º Ano A',
      data: '15/07/2026',
      status: 'aberta',
      progresso: 60,
    },
    {
      titulo: 'Prova Bimestral — Álgebra',
      descricao: 'Conteúdo: equações do 2º grau, sistemas lineares e funções.',
      disciplina: 'Matemática',
      turma: '3º Ano A',
      data: '18/07/2026',
      status: 'agendada',
    },
    {
      titulo: 'Trabalho em Grupo — Geometria Espacial',
      descricao: 'Grupos de 4 alunos. Apresentação de maquete e relatório.',
      disciplina: 'Matemática',
      turma: '3º Ano A',
      data: '22/07/2026',
      status: 'aberta',
      progresso: 30,
    },
    {
      titulo: 'Questionário Diagnóstico',
      descricao: 'Avaliação diagnóstica para identificar lacunas de aprendizagem.',
      disciplina: 'Matemática',
      turma: '3º Ano A',
      data: '05/07/2026',
      status: 'enviada',
      progresso: 100,
    },
    {
      titulo: 'Seminário — Estatística',
      descricao: 'Apresentação em grupo sobre conceitos estatísticos aplicados.',
      disciplina: 'Matemática',
      turma: '3º Ano A',
      data: '30/07/2026',
      status: 'agendada',
    },
    {
      titulo: 'Redação — Tema Livre',
      descricao: 'Dissertação argumentativa, mínimo de 25 linhas.',
      disciplina: 'Língua Portuguesa',
      turma: '3º Ano A',
      data: '08/07/2026',
      status: 'enviada',
      progresso: 100,
    },
    {
      titulo: 'Atividade Complementar — Probabilidade',
      descricao: 'Exercícios de probabilidade simples e composta.',
      disciplina: 'Matemática',
      turma: '3º Ano A',
      data: '25/07/2026',
      status: 'paraCorrigir',
      progresso: 100,
    },
    {
      titulo: 'Relatório de Experimento — Lei de Ohm',
      descricao: 'Relatório da atividade prática realizada em laboratório.',
      disciplina: 'Física',
      turma: '3º Ano A',
      data: '02/07/2026',
      status: 'corrigida',
      nota: 9.0,
    },
  ];

  get atividadesFiltradas(): Atividade[] {
    return this.atividades.filter((a) => {
      const combinaFiltro = this.filtroAtivo === 'todos' || a.status === this.filtroAtivo;
      const combinaBusca =
        !this.termoBusca.trim() ||
        a.titulo.toLowerCase().includes(this.termoBusca.trim().toLowerCase()) ||
        a.disciplina.toLowerCase().includes(this.termoBusca.trim().toLowerCase());
      return combinaFiltro && combinaBusca;
    });
  }

  contarPorStatus(status: StatusAtividade): number {
    return this.atividades.filter((a) => a.status === status).length;
  }

  get total(): number {
    return this.atividades.length;
  }

  selecionarFiltro(valor: FiltroAtividade): void {
    this.filtroAtivo = valor;
  }

  get perfilLabel(): string {
    const role = this.authService.getRole();
    return role ? PERFIL_LABEL[role as UserRole] : 'Usuário';
  }

  get corTema(): string {
    const role = this.authService.getRole();
    return role ? PERFIL_COR[role as UserRole] : '#0057A8';
  }

  get ehAluno(): boolean {
    return this.authService.getRole() === 'aluno';
  }
}
