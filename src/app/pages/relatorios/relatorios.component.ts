import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DashboardShellComponent } from '../../components/dashboard-shell/dashboard-shell.component';
import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card.component';
import { AuthService } from '../../services/auth.service';
import { PERFIL_COR, PERFIL_LABEL } from '../../config/perfil';
import { UserRole } from '../types/user';

interface FrequenciaMes {
  label: string;
  valor: number;
}

interface DesempenhoTurma {
  turma: string;
  serie: string;
  alunos: number;
  frequencia: number;
  media: number;
  situacao: 'Regular' | 'Atenção' | 'Crítico';
}

interface MediaDisciplina {
  disciplina: string;
  media: number;
}

interface MatriculasAno {
  ano: string;
  total: number;
}

interface MatriculasSerie {
  serie: string;
  total: number;
}

interface ComposicaoMatricula {
  label: string;
  valor: number;
  cor: string;
}

interface AlunoFrequenciaBaixa {
  nome: string;
  turma: string;
  frequencia: number;
}

interface PontoGrafico {
  x: number;
  y: number;
  label: string;
  valor: number;
}

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [DashboardShellComponent, DashboardCardComponent],
  templateUrl: './relatorios.component.html',
  styleUrl: './relatorios.component.css',
})
export class RelatoriosComponent {
  private readonly authService = inject(AuthService);
  private readonly platformId = inject(PLATFORM_ID);

  // --- Relatório Geral da Escola (ano letivo de 2026) --------------------

  readonly totalAlunos = 842;
  readonly totalProfessores = 56;
  readonly totalTurmas = 24;
  readonly totalDisciplinas = 12;
  readonly totalResponsaveis = 758;

  readonly frequenciaMediaEscola = 92;
  readonly mediaGeralEscola = 7.6;

  readonly alunosAprovados = 712;
  readonly alunosRecuperacao = 63;
  readonly alunosReprovados = 41;
  readonly alunosEvadidos = 26;

  /** Percentual de um valor em relação ao total de alunos matriculados. */
  private percentualDoTotal(valor: number): number {
    return Math.round((valor / this.totalAlunos) * 1000) / 10;
  }

  get percentualAprovados(): number {
    return this.percentualDoTotal(this.alunosAprovados);
  }

  get percentualRecuperacao(): number {
    return this.percentualDoTotal(this.alunosRecuperacao);
  }

  get percentualReprovados(): number {
    return this.percentualDoTotal(this.alunosReprovados);
  }

  get percentualEvadidos(): number {
    return this.percentualDoTotal(this.alunosEvadidos);
  }

  /** Converte um valor em percentual de um máximo, para escalar barras/gráficos. */
  escalaPercentual(valor: number, max: number): number {
    return max > 0 ? Math.round((valor / max) * 100) : 0;
  }

  // --- Desempenho por turma (amostra do Ensino Médio) ---------------------

  readonly desempenhoPorTurma: DesempenhoTurma[] = [
    { turma: '1º Ano A', serie: 'Ensino Médio', alunos: 38, frequencia: 94, media: 7.8, situacao: 'Regular' },
    { turma: '1º Ano B', serie: 'Ensino Médio', alunos: 36, frequencia: 90, media: 7.2, situacao: 'Regular' },
    { turma: '1º Ano C', serie: 'Ensino Médio', alunos: 35, frequencia: 88, media: 6.9, situacao: 'Atenção' },
    { turma: '2º Ano A', serie: 'Ensino Médio', alunos: 34, frequencia: 93, media: 7.9, situacao: 'Regular' },
    { turma: '2º Ano B', serie: 'Ensino Médio', alunos: 33, frequencia: 91, media: 7.4, situacao: 'Regular' },
    { turma: '2º Ano C', serie: 'Ensino Médio', alunos: 32, frequencia: 85, media: 6.5, situacao: 'Atenção' },
    { turma: '3º Ano A', serie: 'Ensino Médio', alunos: 30, frequencia: 96, media: 8.3, situacao: 'Regular' },
    { turma: '3º Ano B', serie: 'Ensino Médio', alunos: 29, frequencia: 82, media: 6.1, situacao: 'Crítico' },
  ];

  get maiorAlunosTurma(): number {
    return Math.max(...this.desempenhoPorTurma.map((t) => t.alunos));
  }

  // --- Média geral por disciplina -----------------------------------------

  readonly mediasPorDisciplina: MediaDisciplina[] = [
    { disciplina: 'Educação Física', media: 8.9 },
    { disciplina: 'Artes', media: 8.4 },
    { disciplina: 'Empreendedorismo', media: 8.1 },
    { disciplina: 'História', media: 7.8 },
    { disciplina: 'Filosofia', media: 7.7 },
    { disciplina: 'Ciências', media: 7.6 },
    { disciplina: 'Geografia', media: 7.5 },
    { disciplina: 'Língua Portuguesa', media: 7.4 },
    { disciplina: 'Matemática', media: 7.1 },
    { disciplina: 'Inglês', media: 7.0 },
  ];

  readonly maiorMediaDisciplina = 10;

  // --- Utilidades gerais ----------------------------------------------------

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  imprimirRelatorio(): void {
    if (this.isBrowser) {
      window.print();
    }
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
