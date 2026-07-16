import { Injectable } from '@angular/core';
import { TURMAS } from '../config/turmas';

export type DestinatariosTarefa = 'todos' | 'especificos';

export interface TarefaPublicada {
  id: string;
  titulo: string;
  disciplina: string;
  descricao: string;
  objetivo: string;
  dataEntrega: string;
  valor: number | null;
  arquivoNome?: string;
  destinatarios: DestinatariosTarefa;
  alunosSelecionados?: string[];
  publicadoEm: string;
}

export interface PastaTurma {
  id: string;
  turma: string;
  serie: string;
  disciplina: string;
  titulo: string;
  descricao: string;
  capaCor: string;
  capaIcone: string;
  tarefas: TarefaPublicada[];
}

const CAPAS_PADRAO: { cor: string; icone: string }[] = [
  { cor: 'azul', icone: 'bi-calculator-fill' },
  { cor: 'verde', icone: 'bi-graph-up' },
  { cor: 'laranja', icone: 'bi-rulers' },
];

/**
 * Guarda as "pastas" de atividades (uma por turma) do professor, com capa,
 * título, descrição editáveis e as tarefas publicadas em cada uma.
 * Compartilhado entre a página "Atividades" do professor (que publica as
 * tarefas) e a do aluno (que enxerga a capa/título/descrição da pasta da
 * sua turma e as tarefas destinadas a ele).
 */
@Injectable({
  providedIn: 'root',
})
export class PastasAtividadesService {
  readonly pastas: PastaTurma[] = TURMAS.map((turma, index) => {
    const capa = CAPAS_PADRAO[index % CAPAS_PADRAO.length];
    return {
      id: turma.nome,
      turma: turma.nome,
      serie: turma.serie,
      disciplina: turma.disciplina,
      titulo: `${turma.disciplina} — ${turma.nome}`,
      descricao: `Atividades, provas e trabalhos de ${turma.disciplina} para a turma do ${turma.nome}.`,
      capaCor: capa.cor,
      capaIcone: capa.icone,
      tarefas: [],
    };
  });

  obterPastaPorTurma(turma: string): PastaTurma | undefined {
    return this.pastas.find((p) => p.turma === turma);
  }

  obterPastaPorId(id: string): PastaTurma | undefined {
    return this.pastas.find((p) => p.id === id);
  }

  atualizarPasta(id: string, dados: { titulo: string; descricao: string; capaCor: string }): void {
    const pasta = this.obterPastaPorId(id);
    if (!pasta) return;
    pasta.titulo = dados.titulo.trim() || pasta.titulo;
    pasta.descricao = dados.descricao.trim();
    pasta.capaCor = dados.capaCor;
  }

  adicionarTarefa(pastaId: string, tarefa: Omit<TarefaPublicada, 'id' | 'publicadoEm'>): TarefaPublicada | null {
    const pasta = this.obterPastaPorId(pastaId);
    if (!pasta) return null;

    const nova: TarefaPublicada = {
      ...tarefa,
      id: `${pastaId}-${Date.now()}`,
      publicadoEm: new Date().toLocaleDateString('pt-BR'),
    };
    pasta.tarefas.unshift(nova);
    return nova;
  }

  /** Apenas professores e a direção da escola podem editar a pasta de uma turma. */
  podeEditarPasta(role: string | null): boolean {
    return role === 'professor' || role === 'direcao';
  }
}
