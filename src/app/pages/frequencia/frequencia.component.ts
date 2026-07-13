import { Component, inject } from '@angular/core';
import { DashboardShellComponent } from '../../components/dashboard-shell/dashboard-shell.component';
import { AuthService } from '../../services/auth.service';
import { PERFIL_COR, PERFIL_LABEL } from '../../config/perfil';
import { UserRole } from '../types/user';

interface FrequenciaMes {
  mes: string;
  percentual: number;
}

interface FaltaCalendario {
  dia: number;
  justificada: boolean;
}

interface FrequenciaDisciplina {
  disciplina: string;
  totalAulas: number;
  faltas: number;
}

interface UnidadeFrequencia {
  id: string;
  label: string;
  periodo: string;
  frequenciaGeral: number;
  mesReferencia: string;
  diasNoMes: number;
  meses: FrequenciaMes[];
  faltasCalendario: FaltaCalendario[];
  disciplinas: FrequenciaDisciplina[];
}

@Component({
  selector: 'app-frequencia',
  standalone: true,
  imports: [DashboardShellComponent],
  templateUrl: './frequencia.component.html',
  styleUrl: './frequencia.component.css',
})
export class FrequenciaComponent {
  private readonly authService = inject(AuthService);

  readonly unidades: UnidadeFrequencia[] = [
    {
      id: 'geral',
      label: 'Geral (Ano Letivo)',
      periodo: '1ª, 2ª e 3ª Bimestre · 2026',
      frequenciaGeral: 92,
      mesReferencia: 'Julho de 2026',
      diasNoMes: 31,
      meses: [
        { mes: 'Fev', percentual: 96 },
        { mes: 'Mar', percentual: 94 },
        { mes: 'Abr', percentual: 90 },
        { mes: 'Mai', percentual: 93 },
        { mes: 'Jun', percentual: 88 },
        { mes: 'Jul', percentual: 91 },
      ],
      faltasCalendario: [
        { dia: 4, justificada: true },
        { dia: 11, justificada: false },
        { dia: 18, justificada: true },
        { dia: 25, justificada: false },
      ],
      disciplinas: [
        { disciplina: 'Empreendedorismo', totalAulas: 80, faltas: 4 },
        { disciplina: 'Língua Portuguesa', totalAulas: 80, faltas: 6 },
        { disciplina: 'História', totalAulas: 40, faltas: 2 },
        { disciplina: 'Artes', totalAulas: 40, faltas: 5 },
        { disciplina: 'Filosofia', totalAulas: 40, faltas: 3 },
        { disciplina: 'Química', totalAulas: 40, faltas: 7 },
        { disciplina: 'Geografia', totalAulas: 40, faltas: 2 },
        { disciplina: 'Inglês', totalAulas: 40, faltas: 1 },
      ],
    },
    {
      id: 'bimestre1',
      label: '1ª Bimeste',
      periodo: 'Fevereiro a Abril de 2026',
      frequenciaGeral: 94,
      mesReferencia: 'Abril de 2026',
      diasNoMes: 30,
      meses: [
        { mes: 'Fev', percentual: 96 },
        { mes: 'Mar', percentual: 94 },
        { mes: 'Abr', percentual: 92 },
      ],
      faltasCalendario: [
        { dia: 6, justificada: true },
        { dia: 19, justificada: false },
      ],
      disciplinas: [
        { disciplina: 'Empreendedorismo', totalAulas: 26, faltas: 1 },
        { disciplina: 'Língua Portuguesa', totalAulas: 26, faltas: 2 },
        { disciplina: 'História', totalAulas: 13, faltas: 0 },
        { disciplina: 'Artes', totalAulas: 13, faltas: 1 },
        { disciplina: 'Filosofia', totalAulas: 13, faltas: 1 },
        { disciplina: 'Química', totalAulas: 13, faltas: 2 },
        { disciplina: 'Geografia', totalAulas: 13, faltas: 0 },
        { disciplina: 'Inglês', totalAulas: 13, faltas: 0 },
      ],
    },
    {
      id: 'bimestre2',
      label: '2ª Bimestre',
      periodo: 'Maio a Julho de 2026',
      frequenciaGeral: 90,
      mesReferencia: 'Julho de 2026',
      diasNoMes: 31,
      meses: [
        { mes: 'Mai', percentual: 93 },
        { mes: 'Jun', percentual: 88 },
        { mes: 'Jul', percentual: 91 },
      ],
      faltasCalendario: [
        { dia: 4, justificada: true },
        { dia: 11, justificada: false },
        { dia: 18, justificada: true },
      ],
      disciplinas: [
        { disciplina: 'Empreendedorismo', totalAulas: 27, faltas: 2 },
        { disciplina: 'Língua Portuguesa', totalAulas: 27, faltas: 3 },
        { disciplina: 'História', totalAulas: 13, faltas: 1 },
        { disciplina: 'Artes', totalAulas: 13, faltas: 2 },
        { disciplina: 'Filosofia', totalAulas: 13, faltas: 1 },
        { disciplina: 'Química', totalAulas: 13, faltas: 3 },
        { disciplina: 'Geografia', totalAulas: 13, faltas: 1 },
        { disciplina: 'Inglês', totalAulas: 13, faltas: 1 },
      ],
    },
    {
      id: 'bimestre3',
      label: '3ª Bimestre',
      periodo: 'Agosto a Novembro de 2026',
      frequenciaGeral: 0,
      mesReferencia: 'Ainda não iniciada',
      diasNoMes: 30,
      meses: [
        { mes: 'Ago', percentual: 0 },
        { mes: 'Set', percentual: 0 },
        { mes: 'Out', percentual: 0 },
        { mes: 'Nov', percentual: 0 },
      ],
      faltasCalendario: [],
      disciplinas: [
        { disciplina: 'Empreendedorismo', totalAulas: 0, faltas: 0 },
        { disciplina: 'Língua Portuguesa', totalAulas: 0, faltas: 0 },
        { disciplina: 'História', totalAulas: 0, faltas: 0 },
        { disciplina: 'Artes', totalAulas: 0, faltas: 0 },
        { disciplina: 'Filosofia', totalAulas: 0, faltas: 0 },
        { disciplina: 'Química', totalAulas: 0, faltas: 0 },
        { disciplina: 'Geografia', totalAulas: 0, faltas: 0 },
        { disciplina: 'Inglês', totalAulas: 0, faltas: 0 },
      ],
    },
  ];

  unidadeSelecionadaId = 'geral';

  get unidadeSelecionada(): UnidadeFrequencia {
    return this.unidades.find((u) => u.id === this.unidadeSelecionadaId) ?? this.unidades[0];
  }

  selecionarUnidade(id: string): void {
    this.unidadeSelecionadaId = id;
  }

  diasDoMes(qtd: number): number[] {
    return Array.from({ length: qtd }, (_, i) => i + 1);
  }

  faltaNoDia(dia: number): FaltaCalendario | undefined {
    return this.unidadeSelecionada.faltasCalendario.find((f) => f.dia === dia);
  }

  percentualPresenca(disciplina: FrequenciaDisciplina): number {
    if (disciplina.totalAulas === 0) return 0;
    return Math.round(((disciplina.totalAulas - disciplina.faltas) / disciplina.totalAulas) * 100);
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
