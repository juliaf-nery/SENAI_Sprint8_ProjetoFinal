import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardShellComponent } from '../../components/dashboard-shell/dashboard-shell.component';
import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card.component';
import { AuthService } from '../../services/auth.service';
import { PERFIL_COR, PERFIL_LABEL } from '../../config/perfil';
import { UserRole } from '../types/user';
import { NotasService } from '../../services/notas.service';
import { AlunoTurma, TURMAS } from '../../config/turmas';
import {
  PastasAtividadesService,
  PastaTurma,
  DestinatariosTarefa,
} from '../../services/pastas-atividades.service';

type StatusAtividade = 'aberta' | 'agendada' | 'enviada' | 'paraCorrigir' | 'corrigida';

type TipoEntrega = 'arquivo' | 'link';

interface Atividade {
  titulo: string;
  descricao: string;
  descricaoCompleta: string;
  orientacoes: string[];
  disciplina: string;
  turma: string;
  data: string;
  status: StatusAtividade;
  progresso?: number;
  nota?: number;
  tipoEntrega: TipoEntrega;
  linkExterno?: string;
  arquivoEnviado?: string;
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

interface NovaTarefaForm {
  titulo: string;
  disciplina: string;
  descricao: string;
  objetivo: string;
  dataEntrega: string;
  valor: number | null;
  arquivoNome?: string;
  destinatarios: DestinatariosTarefa;
  alunosSelecionados: string[];
}

interface EditarPastaForm {
  titulo: string;
  descricao: string;
  capaCor: string;
}

interface PastaDisciplinaAluno {
  id: string;
  disciplina: string;
  titulo: string;
  descricao: string;
  capaCor: string;
  capaIcone: string;
}

@Component({
  selector: 'app-atividades',
  standalone: true,
  imports: [DashboardShellComponent, DashboardCardComponent, FormsModule],
  templateUrl: './atividades.component.html',
  styleUrl: './atividades.component.css',
})
export class AtividadesComponent {
  private readonly authService = inject(AuthService);
  private readonly notasService = inject(NotasService);
  private readonly pastasService = inject(PastasAtividadesService);

  private readonly ALUNO_DEMO_EMAIL = 'joao.pedro@educanet.com';
  private readonly ALUNO_DEMO_TURMA = '3º Ano A';
  private readonly ALUNO_DEMO_DISCIPLINA = 'Matemática';

  /** Aba ativa dentro da pasta de disciplina do aluno: lista de atividades ou notas por categoria. */
  abaAtiva: 'atividades' | 'notas' = 'atividades';

  get disciplinaNotas(): string {
    return this.pastaAlunoSelecionada?.disciplina ?? this.ALUNO_DEMO_DISCIPLINA;
  }

  get turmaDoAluno(): string {
    return this.ALUNO_DEMO_TURMA;
  }

  selecionarAba(aba: 'atividades' | 'notas'): void {
    this.abaAtiva = aba;
  }

  /** Notas publicadas pelo professor (página "Notas"), por categoria de avaliação, na disciplina da pasta aberta. */
  get notasPorCategoria(): { categoria: string; valor: number }[] {
    const disciplina = this.disciplinaNotas;
    return this.notasService.categorias
      .map((categoria) => ({
        categoria,
        valor: this.notasService.obterNotaPublicada(this.ALUNO_DEMO_TURMA, disciplina, this.ALUNO_DEMO_EMAIL, categoria),
      }))
      .filter((n): n is { categoria: string; valor: number } => n.valor !== null);
  }

  get atividadesComNota(): Atividade[] {
    return this.atividadesDaPastaAtual.filter((a) => a.nota !== undefined);
  }

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
    // --- Matemática ---
    {
      titulo: 'Lista de Exercícios — Funções do 2º Grau',
      descricao: 'Resolver exercícios 1 a 15 da apostila, página 42.',
      descricaoCompleta: 'Resolva os exercícios de 1 a 15 da apostila, página 42, sobre funções do 2º grau. É importante mostrar todo o desenvolvimento do cálculo, não apenas a resposta final, pois a resolução também será avaliada.',
      orientacoes: [
        'Utilize caneta azul ou preta e escreva com letra legível.',
        'Fotografe ou escaneie todas as páginas em boa iluminação.',
        'Envie em um único arquivo (PDF ou imagem).',
      ],
      disciplina: 'Matemática',
      turma: '3º Ano A',
      data: '15/07/2026',
      status: 'aberta',
      progresso: 60,
      tipoEntrega: 'arquivo',
    },
    {
      titulo: 'Questionário Diagnóstico',
      descricao: 'Avaliação diagnóstica para identificar lacunas de aprendizagem.',
      descricaoCompleta: 'Questionário online de diagnóstico, com 20 perguntas de múltipla escolha sobre os conteúdos vistos no primeiro semestre. O resultado não vale nota, mas ajuda a direcionar as revisões do próximo bimestre.',
      orientacoes: [
        'Responda com atenção, sem consultar o material.',
        'O formulário pode ser respondido apenas uma vez.',
      ],
      disciplina: 'Matemática',
      turma: '3º Ano A',
      data: '05/07/2026',
      status: 'enviada',
      progresso: 100,
      tipoEntrega: 'link',
      linkExterno: 'https://forms.gle/questionario-diagnostico-exemplo',
    },
    {
      titulo: 'Prova Bimestral — Trigonometria',
      descricao: 'Avaliação sobre razões trigonométricas no triângulo retângulo.',
      descricaoCompleta: 'Prova bimestral com 8 questões sobre razões trigonométricas no triângulo retângulo e aplicações práticas, aplicada em sala de aula.',
      orientacoes: [],
      disciplina: 'Matemática',
      turma: '3º Ano A',
      data: '01/07/2026',
      status: 'corrigida',
      nota: 8.5,
      tipoEntrega: 'arquivo',
      arquivoEnviado: 'prova-trigonometria.pdf',
    },

    // --- Língua Portuguesa ---
    {
      titulo: 'Interpretação de Texto — Crônicas',
      descricao: 'Leitura e questões sobre duas crônicas contemporâneas.',
      descricaoCompleta: 'Leia as duas crônicas indicadas na apostila (páginas 58 e 61) e responda às 6 questões de interpretação, justificando as respostas com trechos do texto.',
      orientacoes: [
        'Justifique cada resposta com uma citação do texto.',
        'Envie em um único arquivo (PDF ou imagem).',
      ],
      disciplina: 'Língua Portuguesa',
      turma: '3º Ano A',
      data: '20/07/2026',
      status: 'aberta',
      progresso: 10,
      tipoEntrega: 'arquivo',
    },
    {
      titulo: 'Redação — Tema Livre',
      descricao: 'Dissertação argumentativa, mínimo de 25 linhas.',
      descricaoCompleta: 'Escreva uma dissertação argumentativa de no mínimo 25 linhas sobre um tema de sua escolha relacionado à atualidade. Capriche na introdução, desenvolvimento com argumentos consistentes e conclusão com proposta de intervenção.',
      orientacoes: [
        'Use folha de redação padrão (disponível na secretaria).',
        'Envie uma foto legível ou o arquivo digitalizado.',
      ],
      disciplina: 'Língua Portuguesa',
      turma: '3º Ano A',
      data: '08/07/2026',
      status: 'enviada',
      progresso: 100,
      tipoEntrega: 'arquivo',
      arquivoEnviado: 'redacao-tema-livre.pdf',
    },
    {
      titulo: 'Prova de Gramática — Sintaxe',
      descricao: 'Avaliação sobre termos essenciais e integrantes da oração.',
      descricaoCompleta: 'Prova com 10 questões sobre termos essenciais e integrantes da oração, aplicada em sala de aula.',
      orientacoes: [],
      disciplina: 'Língua Portuguesa',
      turma: '3º Ano A',
      data: '28/06/2026',
      status: 'corrigida',
      nota: 7.5,
      tipoEntrega: 'arquivo',
      arquivoEnviado: 'prova-gramatica.pdf',
    },

    // --- Física ---
    {
      titulo: 'Lista de Exercícios — Cinemática',
      descricao: 'Exercícios sobre movimento uniforme e uniformemente variado.',
      descricaoCompleta: 'Resolva os exercícios 1 a 10 sobre movimento uniforme (MU) e movimento uniformemente variado (MUV), incluindo o traçado dos gráficos posição x tempo e velocidade x tempo.',
      orientacoes: [
        'Trace os gráficos à mão ou usando um aplicativo de sua preferência.',
        'Envie em um único arquivo (PDF ou imagem).',
      ],
      disciplina: 'Física',
      turma: '3º Ano A',
      data: '22/07/2026',
      status: 'aberta',
      progresso: 0,
      tipoEntrega: 'arquivo',
    },
    {
      titulo: 'Simulado de Física — Mecânica',
      descricao: 'Simulado online sobre leis de Newton e energia mecânica.',
      descricaoCompleta: 'Simulado com 15 questões de múltipla escolha sobre as leis de Newton, trabalho e energia mecânica, para revisão antes da prova bimestral.',
      orientacoes: ['O simulado pode ser respondido apenas uma vez.'],
      disciplina: 'Física',
      turma: '3º Ano A',
      data: '10/07/2026',
      status: 'enviada',
      progresso: 100,
      tipoEntrega: 'link',
      linkExterno: 'https://forms.gle/simulado-fisica-mecanica-exemplo',
    },
    {
      titulo: 'Relatório de Experimento — Lei de Ohm',
      descricao: 'Relatório da atividade prática realizada em laboratório.',
      descricaoCompleta: 'Relatório sobre o experimento de comprovação da Lei de Ohm realizado em laboratório, incluindo objetivo, materiais utilizados, procedimento, tabela de medições e conclusão.',
      orientacoes: [
        'Utilize o modelo de relatório fornecido pelo professor.',
        'Inclua o gráfico tensão x corrente elaborado em sala.',
      ],
      disciplina: 'Física',
      turma: '3º Ano A',
      data: '02/07/2026',
      status: 'corrigida',
      nota: 9.0,
      tipoEntrega: 'arquivo',
      arquivoEnviado: 'relatorio-lei-de-ohm.pdf',
    },
  ];

  get atividadesFiltradas(): Atividade[] {
    return this.atividadesDaPastaAtual.filter((a) => {
      const combinaFiltro = this.filtroAtivo === 'todos' || a.status === this.filtroAtivo;
      const combinaBusca =
        !this.termoBusca.trim() ||
        a.titulo.toLowerCase().includes(this.termoBusca.trim().toLowerCase()) ||
        a.disciplina.toLowerCase().includes(this.termoBusca.trim().toLowerCase());
      return combinaFiltro && combinaBusca;
    });
  }

  contarPorStatus(status: StatusAtividade): number {
    return this.atividadesDaPastaAtual.filter((a) => a.status === status).length;
  }

  get total(): number {
    return this.atividadesDaPastaAtual.length;
  }

  selecionarFiltro(valor: FiltroAtividade): void {
    this.filtroAtivo = valor;
  }

  // --- Painel de detalhe da atividade (aluno) ---------------------------

  atividadeSelecionada: Atividade | null = null;
  nomeArquivoSelecionado: string | null = null;
  mostrarConfirmacaoEnvio = false;

  abrirDetalhe(atividade: Atividade): void {
    if (!this.ehAlunoOuResponsavel) return;
    this.atividadeSelecionada = atividade;
    this.nomeArquivoSelecionado = null;
  }

  fecharDetalhe(): void {
    this.atividadeSelecionada = null;
    this.nomeArquivoSelecionado = null;
  }

  /** Indica se a atividade selecionada já foi entregue pelo aluno. */
  get atividadeJaEnviada(): boolean {
    const status = this.atividadeSelecionada?.status;
    return status === 'enviada' || status === 'paraCorrigir' || status === 'corrigida';
  }

  onArquivoSelecionado(evento: Event): void {
    if (!this.ehAluno) return;
    const input = evento.target as HTMLInputElement;
    const arquivo = input.files?.[0];
    this.nomeArquivoSelecionado = arquivo ? arquivo.name : null;
  }

  /** Caso 1: a atividade é entregue por arquivo (PDF ou imagem). */
  enviarArquivo(): void {
    if (!this.ehAluno || !this.atividadeSelecionada || !this.nomeArquivoSelecionado) return;

    this.atividadeSelecionada.status = 'enviada';
    this.atividadeSelecionada.progresso = 100;
    this.atividadeSelecionada.arquivoEnviado = this.nomeArquivoSelecionado;

    this.mostrarConfirmacaoEnvio = true;
    setTimeout(() => (this.mostrarConfirmacaoEnvio = false), 3500);
  }

  /** Caso 2: a atividade é feita em um link externo; o aluno só confirma a conclusão. */
  marcarComoConcluida(): void {
    if (!this.ehAluno || !this.atividadeSelecionada) return;

    this.atividadeSelecionada.status = 'enviada';
    this.atividadeSelecionada.progresso = 100;

    this.mostrarConfirmacaoEnvio = true;
    setTimeout(() => (this.mostrarConfirmacaoEnvio = false), 3500);
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

  get ehResponsavel(): boolean {
    return this.authService.getRole() === 'responsavel';
  }

  get ehAlunoOuResponsavel(): boolean {
    return this.ehAluno || this.ehResponsavel;
  }

  get ehProfessor(): boolean {
    return this.authService.getRole() === 'professor';
  }

  // --- Visão do Aluno: pastas por disciplina ------------------------------

  /** Três disciplinas de exemplo, seguindo o mesmo modelo de pastas do professor. */
  readonly pastasAluno: PastaDisciplinaAluno[] = [
    {
      id: 'matematica',
      disciplina: 'Matemática',
      titulo: `Matemática — ${this.ALUNO_DEMO_TURMA}`,
      descricao: 'Atividades, provas e trabalhos de Matemática.',
      capaCor: 'azul',
      capaIcone: 'bi-calculator-fill',
    },
    {
      id: 'portugues',
      disciplina: 'Língua Portuguesa',
      titulo: `Língua Portuguesa — ${this.ALUNO_DEMO_TURMA}`,
      descricao: 'Atividades, redações e provas de Língua Portuguesa.',
      capaCor: 'verde',
      capaIcone: 'bi-book-half',
    },
    {
      id: 'fisica',
      disciplina: 'Física',
      titulo: `Física — ${this.ALUNO_DEMO_TURMA}`,
      descricao: 'Atividades, relatórios e provas de Física.',
      capaCor: 'laranja',
      capaIcone: 'bi-lightning-charge-fill',
    },
  ];

  pastaAlunoSelecionadaId: string | null = null;

  get pastaAlunoSelecionada(): PastaDisciplinaAluno | undefined {
    return this.pastasAluno.find((p) => p.id === this.pastaAlunoSelecionadaId);
  }

  abrirPastaAluno(id: string): void {
    this.pastaAlunoSelecionadaId = id;
    this.abaAtiva = 'atividades';
  }

  fecharPastaAluno(): void {
    this.pastaAlunoSelecionadaId = null;
  }

  /** Atividades da pasta (disciplina) atualmente aberta pelo aluno. */
  get atividadesDaPastaAtual(): Atividade[] {
    const disciplina = this.pastaAlunoSelecionada?.disciplina;
    if (!disciplina) return [];
    return this.atividades.filter((a) => a.disciplina === disciplina);
  }

  contarAtividadesDaDisciplina(disciplina: string): number {
    return this.atividades.filter((a) => a.disciplina === disciplina).length;
  }

  // --- Visão do Professor: pastas por turma ------------------------------

  readonly pastas: PastaTurma[] = this.pastasService.pastas;
  pastaSelecionadaId: string | null = null;

  get pastaSelecionada(): PastaTurma | undefined {
    return this.pastaSelecionadaId ? this.pastasService.obterPastaPorId(this.pastaSelecionadaId) : undefined;
  }

  abrirPasta(id: string): void {
    this.pastaSelecionadaId = id;
  }

  fecharPasta(): void {
    this.pastaSelecionadaId = null;
  }

  get podeEditarPasta(): boolean {
    return this.pastasService.podeEditarPasta(this.authService.getRole());
  }

  // --- Modal: Adicionar nova tarefa (professor, escopo de uma turma) ----

  modalNovaTarefaAberto = false;
  novaTarefa: NovaTarefaForm = this.tarefaEmBranco();

  private tarefaEmBranco(): NovaTarefaForm {
    return {
      titulo: '',
      disciplina: this.pastaSelecionada?.disciplina ?? '',
      descricao: '',
      objetivo: '',
      dataEntrega: '',
      valor: null,
      arquivoNome: undefined,
      destinatarios: 'todos',
      alunosSelecionados: [],
    };
  }

  get alunosDaPastaSelecionada(): AlunoTurma[] {
    const turma = TURMAS.find((t) => t.nome === this.pastaSelecionada?.turma);
    return turma?.alunos ?? [];
  }

  abrirModalNovaTarefa(): void {
    this.novaTarefa = this.tarefaEmBranco();
    this.modalNovaTarefaAberto = true;
  }

  fecharModalNovaTarefa(): void {
    this.modalNovaTarefaAberto = false;
  }

  onArquivoTarefaSelecionado(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    const arquivo = input.files?.[0];
    this.novaTarefa.arquivoNome = arquivo ? arquivo.name : undefined;
  }

  alunoEstaSelecionado(email: string): boolean {
    return this.novaTarefa.alunosSelecionados.includes(email);
  }

  alternarAluno(email: string): void {
    const lista = this.novaTarefa.alunosSelecionados;
    const idx = lista.indexOf(email);
    if (idx >= 0) {
      lista.splice(idx, 1);
    } else {
      lista.push(email);
    }
  }

  publicarTarefa(): void {
    const pasta = this.pastaSelecionada;
    if (!pasta || !this.novaTarefa.titulo.trim()) return;

    const tarefa = this.pastasService.adicionarTarefa(pasta.id, {
      titulo: this.novaTarefa.titulo.trim(),
      disciplina: this.novaTarefa.disciplina.trim() || pasta.disciplina,
      descricao: this.novaTarefa.descricao.trim(),
      objetivo: this.novaTarefa.objetivo.trim(),
      dataEntrega: this.novaTarefa.dataEntrega,
      valor: this.novaTarefa.valor,
      arquivoNome: this.novaTarefa.arquivoNome,
      destinatarios: this.novaTarefa.destinatarios,
      alunosSelecionados: this.novaTarefa.destinatarios === 'especificos' ? [...this.novaTarefa.alunosSelecionados] : undefined,
    });

    // Reflete a nova tarefa na lista de atividades do aluno de demonstração,
    // caso ela tenha sido publicada para a turma/aluno dele.
    if (tarefa && pasta.turma === this.ALUNO_DEMO_TURMA) {
      const destinadaAoAluno =
        tarefa.destinatarios === 'todos' || (tarefa.alunosSelecionados ?? []).includes(this.ALUNO_DEMO_EMAIL);

      if (destinadaAoAluno) {
        this.atividades.unshift({
          titulo: tarefa.titulo,
          descricao: tarefa.descricao,
          descricaoCompleta: tarefa.descricao,
          orientacoes: tarefa.objetivo ? [tarefa.objetivo] : [],
          disciplina: tarefa.disciplina,
          turma: pasta.turma,
          data: tarefa.dataEntrega || tarefa.publicadoEm,
          status: 'aberta',
          progresso: 0,
          tipoEntrega: 'arquivo',
        });
      }
    }

    this.modalNovaTarefaAberto = false;
  }

  // --- Modal: Editar pasta (professor/direção) ---------------------------

  modalEditarPastaAberto = false;
  editarPastaForm: EditarPastaForm = { titulo: '', descricao: '', capaCor: 'azul' };
  readonly coresCapaDisponiveis = ['azul', 'verde', 'laranja', 'roxo'];

  abrirModalEditarPasta(): void {
    if (!this.podeEditarPasta || !this.pastaSelecionada) return;
    this.editarPastaForm = {
      titulo: this.pastaSelecionada.titulo,
      descricao: this.pastaSelecionada.descricao,
      capaCor: this.pastaSelecionada.capaCor,
    };
    this.modalEditarPastaAberto = true;
  }

  fecharModalEditarPasta(): void {
    this.modalEditarPastaAberto = false;
  }

  salvarPasta(): void {
    if (!this.pastaSelecionada) return;
    this.pastasService.atualizarPasta(this.pastaSelecionada.id, this.editarPastaForm);
    this.modalEditarPastaAberto = false;
  }
}
