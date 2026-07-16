import { Component, inject } from '@angular/core';
import { DashboardShellComponent } from '../../components/dashboard-shell/dashboard-shell.component';
import { AuthService } from '../../services/auth.service';
import { PERFIL_COR, PERFIL_LABEL } from '../../config/perfil';
import { UserRole } from '../types/user';
import { NotasService } from '../../services/notas.service';

type Situacao = 'aprovado' | 'atencao' | 'recuperacao';

interface NotaDisciplina {
  disciplina: string;
  professor: string;
  bim1: number | null;
  bim2: number | null;
  bim3: number | null;
  bim4: number | null;
  media: number;
  frequencia: number;
  situacao: Situacao;
}

@Component({
  selector: 'app-boletim',
  standalone: true,
  imports: [DashboardShellComponent],
  templateUrl: './boletim.component.html',
  styleUrl: './boletim.component.css',
})
export class BoletimComponent {
  private readonly authService = inject(AuthService);
  private readonly notasService = inject(NotasService);

  /** Persona fixa usada em todo o painel do aluno nesta demonstração. */
  private readonly ALUNO_EMAIL = 'joao.pedro@edu.conecta';
  private readonly ALUNO_TURMA = '3º Ano A';
  private readonly DISCIPLINA_PROFESSOR = 'Matemática';

  readonly bimestreAtual = '2º';
  readonly anoLetivo = '2026';

  readonly notas: NotaDisciplina[] = [
    { disciplina: 'Matemática', professor: 'Prof. Eduardo Nascimento', bim1: 7.5, bim2: 8.0, bim3: null, bim4: null, media: 7.8, frequencia: 94, situacao: 'aprovado' },
    { disciplina: 'Empreendedorismo', professor: 'Prof. Wanderson Souza', bim1: 10, bim2: 10, bim3: null, bim4: null, media: 10, frequencia: 94, situacao: 'aprovado' },
    { disciplina: 'Língua Portuguesa', professor: 'Prof. Carlos Lima', bim1: 8.0, bim2: 7.5, bim3: null, bim4: null, media: 7.8, frequencia: 92, situacao: 'aprovado' },
    { disciplina: 'História', professor: 'Prof. Ana Costa', bim1: 8.0, bim2: 8.0, bim3: null, bim4: null, media: 8.0, frequencia: 96, situacao: 'aprovado' },
    { disciplina: 'Artes', professor: 'Prof. Nathy Eliana', bim1: 8.5, bim2: 8.5, bim3: null, bim4: null, media: 8.5, frequencia: 98, situacao: 'aprovado' },
    { disciplina: 'Filosofia', professor: 'Prof. Arthir Alves', bim1: 7.5, bim2: 7.5, bim3: null, bim4: null, media: 7.5, frequencia: 91, situacao: 'aprovado' },
    { disciplina: 'Química', professor: 'Prof. Pedro Souza', bim1: 5.5, bim2: 5.0, bim3: null, bim4: null, media: 5.3, frequencia: 85, situacao: 'recuperacao' },
    { disciplina: 'Geografia', professor: 'Prof. Costa Mendes', bim1: 7.8, bim2: 8.1, bim3: null, bim4: null, media: 8.0, frequencia: 93, situacao: 'aprovado' },
    { disciplina: 'Inglês', professor: 'Prof. Marcos Silva', bim1: 8.5, bim2: 8.5, bim3: null, bim4: null, media: 8.5, frequencia: 97, situacao: 'aprovado' },
  ];

  /**
   * Notas de Matemática publicadas pelo professor na página "Notas"
   * (por categoria de avaliação). Some direto da fonte compartilhada
   * NotasService, então refletem a publicação em tempo real.
   */
  get avaliacoesPublicadas(): { categoria: string; valor: number }[] {
    return this.notasService.categorias
      .map((categoria) => ({
        categoria,
        valor: this.notasService.obterNotaPublicada(this.ALUNO_TURMA, this.DISCIPLINA_PROFESSOR, this.ALUNO_EMAIL, categoria),
      }))
      .filter((n): n is { categoria: string; valor: number } => n.valor !== null);
  }

  get mediaGeral(): string {
    const soma = this.notas.reduce((acc, n) => acc + n.media, 0);
    return (soma / this.notas.length).toFixed(1).replace('.', ',');
  }

  get frequenciaGeral(): number {
    const soma = this.notas.reduce((acc, n) => acc + n.frequencia, 0);
    return Math.round(soma / this.notas.length);
  }

  get maiorMedia(): number {
    return Math.max(...this.notas.map((n) => n.media));
  }

  /** Altura relativa (%) da barra no mini gráfico "Médias por Disciplina". */
  alturaBarra(media: number): number {
    return Math.max((media / 10) * 100, 6);
  }

  situacaoLabel(situacao: Situacao): string {
    switch (situacao) {
      case 'aprovado':
        return 'Aprovado';
      case 'atencao':
        return 'Atenção';
      case 'recuperacao':
        return 'Recuperação';
    }
  }

  situacaoClasse(situacao: Situacao): string {
    switch (situacao) {
      case 'aprovado':
        return 'badge-pill';
      case 'atencao':
        return 'badge-pill atencao';
      case 'recuperacao':
        return 'badge-pill urgente';
    }
  }

  get nomeAluno(): string {
    return this.authService.getNome() ?? 'Aluno';
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