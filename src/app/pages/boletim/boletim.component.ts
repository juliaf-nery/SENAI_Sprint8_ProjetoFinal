import { Component, inject } from '@angular/core';
import { DashboardShellComponent } from '../../components/dashboard-shell/dashboard-shell.component';
import { AuthService } from '../../services/auth.service';
import { PERFIL_COR, PERFIL_LABEL } from '../../config/perfil';
import { UserRole } from '../types/user';

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

/**
 * Página "Boletim Escolar" — disponível para Aluno e Responsável.
 * Segue o modelo definido no PDF de especificação: indicadores gerais
 * (média, frequência, bimestre atual), gráfico de médias por disciplina
 * e tabela detalhada de notas por bimestre.
 */
@Component({
  selector: 'app-boletim',
  standalone: true,
  imports: [DashboardShellComponent],
  templateUrl: './boletim.component.html',
  styleUrl: './boletim.component.css',
})
export class BoletimComponent {
  private readonly authService = inject(AuthService);

  readonly bimestreAtual = '2º';
  readonly anoLetivo = '2026';

  readonly notas: NotaDisciplina[] = [
    { disciplina: 'Matemática', professor: 'Prof. Mariana Santos', bim1: 7.5, bim2: 8.0, bim3: null, bim4: null, media: 8.0, frequencia: 94, situacao: 'aprovado' },
    { disciplina: 'Língua Portuguesa', professor: 'Prof. Carlos Lima', bim1: 8.0, bim2: 7.5, bim3: null, bim4: null, media: 7.8, frequencia: 92, situacao: 'aprovado' },
    { disciplina: 'História', professor: 'Prof. Ana Costa', bim1: 8.0, bim2: 8.0, bim3: null, bim4: null, media: 8.0, frequencia: 96, situacao: 'aprovado' },
    { disciplina: 'Biologia', professor: 'Prof. Roberto Alves', bim1: 8.5, bim2: 8.5, bim3: null, bim4: null, media: 8.5, frequencia: 98, situacao: 'aprovado' },
    { disciplina: 'Física', professor: 'Prof. Juliana Ferreira', bim1: 7.0, bim2: 7.5, bim3: null, bim4: null, media: 7.3, frequencia: 91, situacao: 'aprovado' },
    { disciplina: 'Química', professor: 'Prof. Pedro Souza', bim1: 5.5, bim2: 5.0, bim3: null, bim4: null, media: 5.3, frequencia: 85, situacao: 'recuperacao' },
    { disciplina: 'Geografia', professor: 'Prof. Costa Mendes', bim1: 7.8, bim2: 8.1, bim3: null, bim4: null, media: 8.0, frequencia: 93, situacao: 'aprovado' },
    { disciplina: 'Inglês', professor: 'Prof. Marcos Silva', bim1: 8.5, bim2: 8.5, bim3: null, bim4: null, media: 8.5, frequencia: 97, situacao: 'aprovado' },
  ];

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
