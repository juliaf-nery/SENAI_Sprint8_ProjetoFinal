import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardShellComponent } from '../../components/dashboard-shell/dashboard-shell.component';
import { AuthService } from '../../services/auth.service';
import { PERFIL_COR, PERFIL_LABEL } from '../../config/perfil';
import { UserRole } from '../types/user';
import { TURMAS, Turma } from '../../config/turmas';
import { NotasService } from '../../services/notas.service';

type Planilha = Record<string, Record<string, number | null>>;

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [DashboardShellComponent, FormsModule],
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.css',
})
export class NotasComponent {
  private readonly authService = inject(AuthService);
  private readonly notasService = inject(NotasService);

  readonly turmas: Turma[] = TURMAS;
  turmaSelecionadaNome = this.turmas[0].nome;

  /** Rascunhos "salvos" (mas ainda não publicados) por turma, mantidos nesta sessão. */
  private readonly rascunhosPorTurma = new Map<string, Planilha>();

  planilha: Planilha = {};

  novaCategoria = '';
  popupNotas: { tipo: 'salvo' | 'publicado'; texto: string } | null = null;

  constructor() {
    this.carregarPlanilha();
  }

  get categorias(): string[] {
    return this.notasService.categorias;
  }

  get turmaSelecionada(): Turma {
    return this.turmas.find((t) => t.nome === this.turmaSelecionadaNome) ?? this.turmas[0];
  }

  selecionarTurma(nome: string): void {
    this.turmaSelecionadaNome = nome;
    this.carregarPlanilha();
  }

  private carregarPlanilha(): void {
    const turma = this.turmaSelecionada;
    const rascunho = this.rascunhosPorTurma.get(turma.nome);

    const planilha: Planilha = {};
    for (const aluno of turma.alunos) {
      planilha[aluno.email] = {};
      for (const categoria of this.categorias) {
        const valorRascunho = rascunho?.[aluno.email]?.[categoria];
        planilha[aluno.email][categoria] =
          valorRascunho !== undefined
            ? valorRascunho
            : this.notasService.obterNotaPublicada(turma.nome, turma.disciplina, aluno.email, categoria);
      }
    }
    this.planilha = planilha;
    this.popupNotas = null;
  }

  notaCelula(alunoEmail: string, categoria: string): number | null {
    return this.planilha[alunoEmail]?.[categoria] ?? null;
  }

  atualizarNota(alunoEmail: string, categoria: string, valorTexto: string): void {
    const valor = valorTexto === '' ? null : Number(valorTexto);
    if (valor !== null && (Number.isNaN(valor) || valor < 0 || valor > 10)) return;
    if (!this.planilha[alunoEmail]) this.planilha[alunoEmail] = {};
    this.planilha[alunoEmail][categoria] = valor;
    this.popupNotas = null;
  }

  mediaDoAluno(alunoEmail: string): string {
    const notas = this.categorias
      .map((categoria) => this.planilha[alunoEmail]?.[categoria])
      .filter((n): n is number => n !== null && n !== undefined);

    if (notas.length === 0) return '—';
    const media = notas.reduce((soma, n) => soma + n, 0) / notas.length;
    return media.toFixed(1);
  }

  // --- Categorias ---------------------------------------------------------

  adicionarCategoria(): void {
    const adicionou = this.notasService.adicionarCategoria(this.novaCategoria);
    if (!adicionou) return;

    const categoria = this.novaCategoria.trim();
    for (const email of Object.keys(this.planilha)) {
      this.planilha[email][categoria] = null;
    }
    this.novaCategoria = '';
  }

  removerCategoria(categoria: string): void {
    this.notasService.removerCategoria(categoria);
    for (const email of Object.keys(this.planilha)) {
      delete this.planilha[email][categoria];
    }
  }

  // --- Ações ---------------------------------------------------------------

  salvarAlteracao(): void {
    this.rascunhosPorTurma.set(this.turmaSelecionadaNome, structuredClone(this.planilha));
    this.abrirPopup('salvo', 'Alterações salvas');
  }

  publicar(): void {
    const turma = this.turmaSelecionada;
    const notas = Object.entries(this.planilha).flatMap(([alunoEmail, categorias]) =>
      Object.entries(categorias).map(([categoria, valor]) => ({ alunoEmail, categoria, valor }))
    );

    this.notasService.publicarNotas(turma.nome, turma.disciplina, notas);
    this.rascunhosPorTurma.set(this.turmaSelecionadaNome, structuredClone(this.planilha));
    this.abrirPopup('publicado', 'Notas publicadas! Os alunos já podem visualizá-las no Boletim e em Atividades.');
  }

  private abrirPopup(tipo: 'salvo' | 'publicado', texto: string): void {
    this.popupNotas = { tipo, texto };
    setTimeout(() => (this.popupNotas = null), 3500);
  }

  fecharPopupNotas(): void {
    this.popupNotas = null;
  }

  get perfilLabel(): string {
    const role = this.authService.getRole();
    return role ? PERFIL_LABEL[role as UserRole] : 'Usuário';
  }

  get corTema(): string {
    const role = this.authService.getRole();
    return role ? PERFIL_COR[role as UserRole] : '#2E7D32';
  }
}
