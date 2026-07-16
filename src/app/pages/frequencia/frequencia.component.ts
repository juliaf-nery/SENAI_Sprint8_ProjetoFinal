import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardShellComponent } from '../../components/dashboard-shell/dashboard-shell.component';
import { AuthService } from '../../services/auth.service';
import { PERFIL_COR, PERFIL_LABEL } from '../../config/perfil';
import { UserRole } from '../types/user';
import { TURMAS, Turma } from '../../config/turmas';
import { FrequenciaService } from '../../services/frequencia.service';

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
  imports: [DashboardShellComponent, FormsModule],
  templateUrl: './frequencia.component.html',
  styleUrl: './frequencia.component.css',
})
export class FrequenciaComponent {
  private readonly authService = inject(AuthService);
  private readonly frequenciaService = inject(FrequenciaService);

  private readonly ALUNO_DEMO_EMAIL = 'joao.pedro@edu.conecta';
  private readonly ALUNO_DEMO_TURMA = '3º Ano A';
  private readonly ALUNO_DEMO_DISCIPLINA = 'Matemática';

  readonly unidades: UnidadeFrequencia[] = [
    {
      id: 'geral',
      label: 'Geral (Ano Letivo)',
      periodo: '1ª, 2ª e 3ª Bimestre · 2026',
      frequenciaGeral: 95,
      mesReferencia: 'Julho de 2026',
      diasNoMes: 31,
      meses: [
        { mes: 'Fev', percentual: 100 },
        { mes: 'Mar', percentual: 95 },
        { mes: 'Abr', percentual: 100 },
        { mes: 'Mai', percentual: 93 },
        { mes: 'Jun', percentual: 90 },
        { mes: 'Jul', percentual: 100 },
      ],
      faltasCalendario: [
        { dia: 11, justificada: false },
        { dia: 25, justificada: false },
      ],
      disciplinas: [
        { disciplina: 'Empreendedorismo', totalAulas: 80, faltas: 0 },
        { disciplina: 'Língua Portuguesa', totalAulas: 80, faltas: 0 },
        { disciplina: 'História', totalAulas: 40, faltas: 1 },
        { disciplina: 'Artes', totalAulas: 40, faltas: 0 },
        { disciplina: 'Filosofia', totalAulas: 40, faltas: 1 },
        { disciplina: 'Química', totalAulas: 40, faltas: 0 },
        { disciplina: 'Geografia', totalAulas: 40, faltas: 0 },
        { disciplina: 'Inglês', totalAulas: 40, faltas: 0 },
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
        { dia: 10, justificada: false },
        { dia: 19, justificada: false },
        { dia: 20, justificada: false },
        { dia: 26, justificada: false },
        { dia: 27, justificada: false },
        { dia: 30, justificada: true },
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
        { disciplina: 'Empreendedorismo', totalAulas: 27, faltas: 1 },
        { disciplina: 'Língua Portuguesa', totalAulas: 27, faltas: 1 },
        { disciplina: 'História', totalAulas: 13, faltas: 0 },
        { disciplina: 'Artes', totalAulas: 13, faltas: 0 },
        { disciplina: 'Filosofia', totalAulas: 13, faltas: 0 },
        { disciplina: 'Química', totalAulas: 13, faltas: 1 },
        { disciplina: 'Geografia', totalAulas: 13, faltas: 0 },
        { disciplina: 'Inglês', totalAulas: 13, faltas: 0 },
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

  // --- Integração ao vivo com a chamada publicada pelo professor (visão aluno/responsável) ---

  private readonly NOMES_MESES = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
  ];

  /** Faltas publicadas pelo professor na página "Frequência" dele, já convertidas em dia/mês/ano. */
  private get faltasPublicadasAoVivo(): { dia: number; mes: number }[] {
    return this.frequenciaService
      .obterFaltasDoAluno(this.ALUNO_DEMO_TURMA, this.ALUNO_DEMO_DISCIPLINA, this.ALUNO_DEMO_EMAIL)
      .map((f) => {
        const [, mes, dia] = f.dataISO.split('-').map(Number);
        return { dia, mes };
      });
  }

  /** Calendário de faltas da unidade selecionada, somando as faltas publicadas ao vivo pelo professor. */
  get faltasCalendarioComLive(): FaltaCalendario[] {
    const base = [...this.unidadeSelecionada.faltasCalendario];
    const mesRef = this.unidadeSelecionada.mesReferencia.toLowerCase();

    for (const falta of this.faltasPublicadasAoVivo) {
      const nomeMes = this.NOMES_MESES[falta.mes - 1];
      const pertenceAoMesExibido = nomeMes && mesRef.includes(nomeMes);
      const jaExiste = base.some((b) => b.dia === falta.dia);
      if (pertenceAoMesExibido && !jaExiste) {
        base.push({ dia: falta.dia, justificada: false });
      }
    }
    return base;
  }

  faltaNoDiaComLive(dia: number): FaltaCalendario | undefined {
    return this.faltasCalendarioComLive.find((f) => f.dia === dia);
  }

  get disciplinasComLive(): FrequenciaDisciplina[] {
    const extras = this.faltasPublicadasAoVivo.length;
    if (!extras) return this.unidadeSelecionada.disciplinas;

    return this.unidadeSelecionada.disciplinas.map((d) =>
      d.disciplina === this.ALUNO_DEMO_DISCIPLINA ? { ...d, faltas: d.faltas + extras } : d
    );
  }

  get faltasRegistradasComLive(): number {
    return this.faltasCalendarioComLive.length;
  }

  // --- Modo Professor: chamada (registro de presença por turma) ---------

  readonly turmas: Turma[] = TURMAS;
  turmaSelecionadaNome = this.turmas[0].nome;

  /** Rascunhos "salvos" (mas ainda não publicados) por turma, mantidos nesta sessão. */
  private readonly rascunhosPorTurma = new Map<string, Record<string, boolean>>();

  /** Chamada em edição: e-mail do aluno -> presente (true) ou falta (false). */
  chamada: Record<string, boolean> = {};

  popupFrequencia: { tipo: 'salvo' | 'publicado'; texto: string } | null = null;

  constructor() {
    if (this.ehProfessor) {
      this.carregarChamada();
    }
  }

  get ehProfessor(): boolean {
    return this.authService.getRole() === 'professor';
  }

  get turmaSelecionada(): Turma {
    return this.turmas.find((t) => t.nome === this.turmaSelecionadaNome) ?? this.turmas[0];
  }

  get dataAtual(): Date {
    return new Date();
  }

  get dataAtualFormatada(): string {
    return this.dataAtual.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  private get dataAtualISO(): string {
    const d = this.dataAtual;
    const ano = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }

  selecionarTurma(nome: string): void {
    this.turmaSelecionadaNome = nome;
    this.carregarChamada();
  }

  private carregarChamada(): void {
    const turma = this.turmaSelecionada;
    const rascunho = this.rascunhosPorTurma.get(turma.nome);

    const chamada: Record<string, boolean> = {};
    for (const aluno of turma.alunos) {
      if (rascunho && aluno.email in rascunho) {
        chamada[aluno.email] = rascunho[aluno.email];
      } else {
        const publicada = this.frequenciaService.obterPresencaPublicada(
          turma.nome,
          turma.disciplina,
          this.dataAtualISO,
          aluno.email
        );
        chamada[aluno.email] = publicada ?? true;
      }
    }
    this.chamada = chamada;
    this.popupFrequencia = null;
  }

  presencaAluno(alunoEmail: string): boolean {
    return this.chamada[alunoEmail] ?? true;
  }

  alternarPresenca(alunoEmail: string): void {
    this.chamada[alunoEmail] = !this.presencaAluno(alunoEmail);
  }

  salvarAlteracoes(): void {
    this.rascunhosPorTurma.set(this.turmaSelecionadaNome, { ...this.chamada });
    this.abrirPopup('salvo', 'Alterações salvas');
  }

  publicar(): void {
    const turma = this.turmaSelecionada;
    const registros = turma.alunos.map((aluno) => ({
      alunoEmail: aluno.email,
      presente: this.presencaAluno(aluno.email),
    }));

    this.frequenciaService.publicarChamada(turma.nome, turma.disciplina, this.dataAtualISO, registros);
    this.rascunhosPorTurma.set(this.turmaSelecionadaNome, { ...this.chamada });
    this.abrirPopup('publicado', 'Frequência publicada! O calendário de presença dos alunos foi atualizado.');
  }

  private abrirPopup(tipo: 'salvo' | 'publicado', texto: string): void {
    this.popupFrequencia = { tipo, texto };
    setTimeout(() => (this.popupFrequencia = null), 3500);
  }

  fecharPopupFrequencia(): void {
    this.popupFrequencia = null;
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